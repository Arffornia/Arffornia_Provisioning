import * as crypto from "crypto";
import * as fs from "fs";
import * as http from "http";
import { AddressInfo } from "net";
import * as os from "os";
import * as path from "path";
import { CurseforgeAPI, ModFile } from "@arffornia/nexus_mods";
import { main, updateConfig } from "../src/configUpdater";

// Smoke tests of the config-updater against a local HTTP fixture, with the real Nexus_Mods
// library. CurseForge lookups are stubbed; nothing leaves the machine.

for (const key of ["HTTP_PROXY", "HTTPS_PROXY", "http_proxy", "https_proxy", "ALL_PROXY", "all_proxy"]) {
    delete process.env[key];
}

const sha1 = (s: string) => crypto.createHash("sha1").update(s).digest("hex");

const JAR = "jar-content";
let routes: Record<string, string>;
let server: http.Server;
let baseUrl: string;
let installDir: string;

function setFixture(curseforge: object[], indexFiles: { path: string; content: string }[]): void {
    routes = {
        "/config/server/modList.json": JSON.stringify({ mods: { curseforge, modrinth: [], "github-releases": [] } }),
        "/config/server/index.json": JSON.stringify({
            generatedAt: "x",
            files: indexFiles.map(f => ({ path: f.path, hash: sha1(f.content), override: true })),
        }),
        "/jars/alpha.jar": JAR,
    };
    for (const f of indexFiles) {
        routes[`/config/server/storage/${f.path}`] = f.content;
    }
}

function stubCurseforge(impl: (projectId: string) => Promise<ModFile>): void {
    jest.spyOn(CurseforgeAPI.prototype, "getModFile").mockImplementation(impl as never);
}

const alpha = () => new ModFile(path.join("mods", "alpha.jar"), sha1(JAR), "SHA1" as never, `${baseUrl}jars/alpha.jar`);

beforeAll(async () => {
    server = http.createServer((req, res) => {
        const body = routes[req.url ?? ""];
        if (body === undefined) {
            res.statusCode = 404;
            res.end("not found");
            return;
        }
        res.setHeader("Content-Type", req.url?.endsWith(".json") ? "application/json" : "application/octet-stream");
        res.end(body);
    });
    await new Promise<void>(resolve => server.listen(0, "127.0.0.1", resolve));
    baseUrl = `http://127.0.0.1:${(server.address() as AddressInfo).port}/`;
});

afterAll(async () => {
    await new Promise<void>(resolve => server.close(() => resolve()));
});

beforeEach(() => {
    jest.spyOn(console, "log").mockImplementation(() => undefined);
    jest.spyOn(console, "error").mockImplementation(() => undefined);
    installDir = fs.mkdtempSync(path.join(os.tmpdir(), "config-updater-test-"));
    fs.mkdirSync(path.join(installDir, "mods"));
});

afterEach(() => {
    jest.restoreAllMocks();
    fs.rmSync(installDir, { recursive: true, force: true });
});

describe("config-updater", () => {
    it("applies mods and files and reports no failure", async () => {
        setFixture([{ displayName: "Alpha", projectId: "1", fileId: "1" }], [{ path: "config/a.toml", content: "a=1" }]);
        stubCurseforge(async () => alpha());
        fs.writeFileSync(path.join(installDir, "mods", "stale.jar"), "old");

        const failures = await updateConfig(installDir, baseUrl, "server", "mods");

        expect(failures).toEqual([]);
        expect(fs.readFileSync(path.join(installDir, "mods", "alpha.jar"), "utf-8")).toBe(JAR);
        expect(fs.readFileSync(path.join(installDir, "config", "a.toml"), "utf-8")).toBe("a=1");
        expect(fs.existsSync(path.join(installDir, "mods", "stale.jar"))).toBe(false);
    });

    it("fails without deleting anything when a mod lookup fails", async () => {
        setFixture(
            [
                { displayName: "Alpha", projectId: "1", fileId: "1" },
                { displayName: "Beta", projectId: "2", fileId: "2" },
            ],
            [],
        );
        stubCurseforge(async (projectId) => {
            if (projectId === "2") throw new Error("503 from CurseForge");
            return alpha();
        });
        fs.writeFileSync(path.join(installDir, "mods", "beta.jar"), "installed earlier");

        const failures = await updateConfig(installDir, baseUrl, "server", "mods");

        expect(failures).toHaveLength(1);
        expect(failures[0].stage).toBe("lookup");
        // The update did not run, so the previously installed mod is still there.
        expect(fs.existsSync(path.join(installDir, "mods", "beta.jar"))).toBe(true);
    });

    it("fails when a download fails", async () => {
        setFixture([{ displayName: "Alpha", projectId: "1", fileId: "1" }], []);
        stubCurseforge(async () => new ModFile(path.join("mods", "alpha.jar"), sha1(JAR), "SHA1" as never, `${baseUrl}missing.jar`));

        const failures = await updateConfig(installDir, baseUrl, "server", "mods");

        expect(failures.length).toBeGreaterThan(0);
        expect(failures[0].stage).toBe("download");
    });

    it("throws when the mod list cannot be fetched", async () => {
        setFixture([], []);
        delete routes["/config/server/modList.json"];

        await expect(updateConfig(installDir, baseUrl, "server", "mods")).rejects.toThrow();
    });

    it("main() returns 1 on failure and 0 on success", async () => {
        process.env.BASE_URL = baseUrl;
        process.env.INSTALL_BASE_PATH = installDir;
        process.env.KIND = "server";
        try {
            setFixture([{ displayName: "Alpha", projectId: "1", fileId: "1" }], []);
            stubCurseforge(async () => { throw new Error("down"); });
            await expect(main()).resolves.toBe(1);

            stubCurseforge(async () => alpha());
            await expect(main()).resolves.toBe(0);
        } finally {
            delete process.env.BASE_URL;
            delete process.env.INSTALL_BASE_PATH;
            delete process.env.KIND;
        }
    });
});
