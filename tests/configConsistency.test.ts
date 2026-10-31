import * as crypto from "crypto";
import * as fs from "fs";
import * as path from "path";

// Offline consistency checks of config/** — run on every PR so a broken mod list or a stale
// index never reaches main (main is live for every player and server).

const CONFIG_DIR = path.join(__dirname, "..", "config");
const KINDS = ["server", "proxy", "launcher"] as const;

/**
 * Mods that are deliberately installed on the server but not in the player launcher.
 * Keys are CurseForge projectIds / Modrinth versionIds / GitHub owner/repo.
 * Add an entry here (with a reason) when a new server-side-only mod is added.
 */
const SERVER_ONLY = new Map<string, string>([
    ["curseforge:1072209", "Mekanism Unleashed"],
    ["curseforge:1152077", "Better Forge Chat Reborn (server chat formatting)"],
    ["curseforge:324952", "Discord Integration Forge (server bridge)"],
    ["curseforge:351938", "Prometheus Exporter (server metrics)"],
    ["curseforge:406463", "BlueMap (server map renderer)"],
    ["curseforge:431733", "LuckPerms (server permissions)"],
    ["modrinth:tdpr4TRc", "NeoForwarding (Velocity forwarding)"],
]);

interface CurseforgeEntry { displayName: string; projectId: string; fileId: string }
interface ModrinthEntry { displayName: string; versionId: string }
interface GithubEntry { displayName: string; owner: string; repoName: string; tag: string; assetName: string }
interface ModList {
    mods: { curseforge?: CurseforgeEntry[]; modrinth?: ModrinthEntry[]; "github-releases"?: GithubEntry[] };
    externalFilesIndexUrl?: string;
}
interface IndexFile { generatedAt: string; files: { path: string; hash: string; override: boolean }[] }

function readJson<T>(...parts: string[]): T {
    return JSON.parse(fs.readFileSync(path.join(CONFIG_DIR, ...parts), "utf-8")) as T;
}

function duplicates(values: string[]): string[] {
    const seen = new Set<string>();
    const dupes = new Set<string>();
    for (const v of values) {
        if (seen.has(v)) dupes.add(v);
        seen.add(v);
    }
    return [...dupes];
}

/** Keys identifying a mod independent of the version (for duplicate / subset checks). */
function modKeys(list: ModList): string[] {
    return [
        ...(list.mods.curseforge ?? []).map(m => `curseforge:${m.projectId}`),
        ...(list.mods.modrinth ?? []).map(m => `modrinth:${m.versionId}`),
        ...(list.mods["github-releases"] ?? []).map(m => `github:${m.owner}/${m.repoName}/${m.assetName}`),
    ];
}

/** Same algorithm and path format as Nexus_Mods generateIndex (relative paths, sha1). */
function walkStorage(dir: string, base = ""): Map<string, string> {
    const out = new Map<string, string>();
    for (const entry of fs.readdirSync(dir)) {
        const full = path.join(dir, entry);
        const rel = path.join(base, entry);
        if (fs.statSync(full).isDirectory()) {
            for (const [p, h] of walkStorage(full, rel)) out.set(p, h);
        } else {
            out.set(rel, crypto.createHash("sha1").update(fs.readFileSync(full)).digest("hex"));
        }
    }
    return out;
}

const isNonEmptyString = (v: unknown) => typeof v === "string" && v.trim().length > 0;

describe.each(KINDS)("config/%s", (kind) => {
    const modList = readJson<ModList>(kind, "modList.json");
    const index = readJson<IndexFile>(kind, "index.json");

    describe("modList.json schema", () => {
        it("has a mods object with only known sources", () => {
            expect(typeof modList.mods).toBe("object");
            for (const key of Object.keys(modList.mods)) {
                expect(["curseforge", "modrinth", "github-releases"]).toContain(key);
                expect(Array.isArray((modList.mods as Record<string, unknown>)[key])).toBe(true);
            }
        });

        it("CurseForge entries have displayName and numeric-string projectId/fileId", () => {
            const bad = (modList.mods.curseforge ?? []).filter(m =>
                !isNonEmptyString(m.displayName) || !/^\d+$/.test(String(m.projectId)) || !/^\d+$/.test(String(m.fileId))
                || typeof m.projectId !== "string" || typeof m.fileId !== "string");
            expect(bad).toEqual([]);
        });

        it("Modrinth entries have displayName and versionId", () => {
            const bad = (modList.mods.modrinth ?? []).filter(m =>
                !isNonEmptyString(m.displayName) || !/^[A-Za-z0-9]{8}$/.test(String(m.versionId)));
            expect(bad).toEqual([]);
        });

        it("GitHub release entries have displayName, owner, repoName, tag and assetName", () => {
            const bad = (modList.mods["github-releases"] ?? []).filter(m =>
                !["displayName", "owner", "repoName", "tag", "assetName"].every(k => isNonEmptyString((m as unknown as Record<string, unknown>)[k])));
            expect(bad).toEqual([]);
        });
    });

    describe("modList.json duplicates", () => {
        it("lists each mod only once", () => {
            expect(duplicates(modKeys(modList))).toEqual([]);
        });

        it("does not list the same mod twice by display name", () => {
            const names = [
                ...(modList.mods.curseforge ?? []),
                ...(modList.mods.modrinth ?? []),
                ...(modList.mods["github-releases"] ?? []),
            ].map(m => m.displayName.trim().toLowerCase());
            expect(duplicates(names)).toEqual([]);
        });
    });

    describe("index.json", () => {
        const storage = walkStorage(path.join(CONFIG_DIR, kind, "storage"));
        const indexed = new Map(index.files.map(f => [f.path, f.hash]));

        it("has a valid shape", () => {
            expect(Array.isArray(index.files)).toBe(true);
            const bad = index.files.filter(f =>
                !isNonEmptyString(f.path) || !/^[0-9a-f]{40}$/.test(f.hash) || typeof f.override !== "boolean");
            expect(bad).toEqual([]);
        });

        it("has no duplicate paths", () => {
            expect(duplicates(index.files.map(f => f.path))).toEqual([]);
        });

        it("only contains relative paths inside storage/", () => {
            const bad = index.files.map(f => f.path).filter(p =>
                path.isAbsolute(p) || p.split(/[\\/]/).includes("..") || p.includes("\\"));
            expect(bad).toEqual([]);
        });

        it("is up to date with storage/ (run `make indexes`)", () => {
            const missing = [...storage.keys()].filter(p => !indexed.has(p));
            const stale = [...indexed.keys()].filter(p => !storage.has(p));
            const changed = [...storage].filter(([p, h]) => indexed.has(p) && indexed.get(p) !== h).map(([p]) => p);
            expect({ missing, stale, changed }).toEqual({ missing: [], stale: [], changed: [] });
        });
    });
});

describe("server and launcher", () => {
    const server = readJson<ModList>("server", "modList.json");
    const launcher = readJson<ModList>("launcher", "modList.json");

    it("every server mod is in the launcher, except the declared server-only mods", () => {
        const launcherKeys = new Set(modKeys(launcher));
        const missing = modKeys(server).filter(k => !launcherKeys.has(k) && !SERVER_ONLY.has(k));
        expect(missing).toEqual([]);
    });

    it("the server-only allowlist has no stale entries", () => {
        const serverKeys = new Set(modKeys(server));
        const launcherKeys = new Set(modKeys(launcher));
        const stale = [...SERVER_ONLY.keys()].filter(k => !serverKeys.has(k) || launcherKeys.has(k));
        expect(stale).toEqual([]);
    });

    it("shared CurseForge mods use the same file on server and launcher", () => {
        const launcherFiles = new Map((launcher.mods.curseforge ?? []).map(m => [m.projectId, m.fileId]));
        const mismatched = (server.mods.curseforge ?? [])
            .filter(m => launcherFiles.has(m.projectId) && launcherFiles.get(m.projectId) !== m.fileId)
            .map(m => `${m.displayName} (${m.projectId}): server ${m.fileId}, launcher ${launcherFiles.get(m.projectId)}`);
        expect(mismatched).toEqual([]);
    });
});
