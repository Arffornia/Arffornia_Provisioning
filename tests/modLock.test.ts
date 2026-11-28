import { buildLock, curseforgeKey, splitModList, LockEntry, LockTarget, lockTargets, LOCK_SCHEMA, plainFileName, retryAfterMs } from "../src/modLock";

const entry = (name: string): LockEntry => ({
    path: `mods/${name}`,
    url: `https://edge.forgecdn.net/files/1/2/${name}`,
    hashType: "sha1",
    hash: "a".repeat(40),
    size: 10,
});

function target(key: string, resolve: () => Promise<LockEntry>): LockTarget {
    return { key, displayName: key, resolve };
}

describe("buildLock", () => {
    it("reuses entries of the previous lock without calling the API", async () => {
        // Arrange
        const resolve = jest.fn(async () => entry("new.jar"));
        const previous = { schema: LOCK_SCHEMA, files: { "curseforge:1:2": entry("old.jar") } };

        // Act
        await buildLock([target("curseforge:1:2", resolve)], previous);

        // Assert
        expect(resolve).not.toHaveBeenCalled();
    });

    it("drops entries that left the mod list", async () => {
        const previous = { schema: LOCK_SCHEMA, files: { "curseforge:9:9": entry("gone.jar") } };

        const result = await buildLock([target("curseforge:1:2", async () => entry("a.jar"))], previous);

        expect(Object.keys(result.lock.files)).toEqual(["curseforge:1:2"]);
    });

    it("leaves failed entries out of the lock and reports them", async () => {
        const result = await buildLock([
            target("curseforge:1:2", async () => entry("a.jar")),
            target("curseforge:3:4", async () => { throw new Error("HTTP 429"); }),
        ], null);

        expect(result.failed.map(f => f.key)).toEqual(["curseforge:3:4"]);
    });

    it("ignores a previous lock with another schema", async () => {
        const resolve = jest.fn(async () => entry("a.jar"));

        await buildLock([target("curseforge:1:2", resolve)], { schema: 0, files: { "curseforge:1:2": entry("a.jar") } });

        expect(resolve).toHaveBeenCalledTimes(1);
    });

    it("writes keys in sorted order so the bot diff stays small", async () => {
        const result = await buildLock([
            target("modrinth:z", async () => entry("z.jar")),
            target("curseforge:1:2", async () => entry("a.jar")),
        ], null);

        expect(Object.keys(result.lock.files)).toEqual(["curseforge:1:2", "modrinth:z"]);
    });
});

describe("lockTargets", () => {
    it("locks CurseForge and Modrinth entries but not rolling GitHub releases", () => {
        const modList = {
            mods: {
                curseforge: [{ displayName: "AE2", projectId: 223794, fileId: 6488853 }],
                modrinth: [{ displayName: "CC", versionId: "abc" }],
                "github-releases": [{ displayName: "Arffornia", owner: "Arffornia", repoName: "Arffornia_Mods", tag: "latest", assetName: "arffornia.jar" }],
            },
        };

        const keys = lockTargets(modList).map(t => t.key);

        expect(keys).toEqual([curseforgeKey(223794, 6488853), "modrinth:abc"]);
    });
});

describe("retryAfterMs", () => {
    it.each([
        ["seconds", "3", 3000],
        ["HTTP date", "Thu, 01 Jan 1970 00:00:10 GMT", 10000],
        ["absent", undefined, null],
        ["garbage", "soon", null],
    ])("reads %s", (_name, header, expected) => {
        expect(retryAfterMs(header, 0)).toBe(expected);
    });
});

describe("plainFileName", () => {
    it.each(["../evil.jar", "a/b.jar", "a\\b.jar", "..", ""])("refuses %p", name => {
        expect(() => plainFileName(name)).toThrow();
    });
});

describe("splitModList", () => {
    const entry: LockEntry = { path: "mods/a.jar", url: "https://cdn.example/a.jar", hashType: "sha1", hash: "a".repeat(40), size: 1 };
    const modList = JSON.stringify({
        mods: {
            curseforge: [{ displayName: "A", projectId: 1, fileId: 2 }, { displayName: "B", projectId: 3, fileId: 4 }],
            modrinth: [{ displayName: "M", versionId: "v1" }],
            "github-releases": [{ displayName: "G", owner: "o", repoName: "r", tag: "latest", assetName: "g.jar" }],
        },
    });

    it("takes locked entries and leaves the rest for the live lookup", () => {
        const lock = { schema: LOCK_SCHEMA, files: { [curseforgeKey(1, 2)]: entry, "modrinth:v1": { ...entry, path: "mods/m.jar" } } };

        const { locked, remainingJson } = splitModList(modList, lock);

        expect(locked.map(e => e.path)).toEqual(["mods/a.jar", "mods/m.jar"]);
        const remaining = JSON.parse(remainingJson).mods;
        expect(remaining.curseforge.map((m: { displayName: string }) => m.displayName)).toEqual(["B"]);
        expect(remaining.modrinth).toEqual([]);
        expect(remaining["github-releases"]).toHaveLength(1);
    });

    it("ignores a lock with another schema", () => {
        const { locked } = splitModList(modList, { schema: LOCK_SCHEMA + 1, files: { [curseforgeKey(1, 2)]: entry } });

        expect(locked).toEqual([]);
    });

    it.each([
        ["a path outside mods/", { path: "../a.jar" }],
        ["a nested path", { path: "mods/x/a.jar" }],
        ["a plain http URL", { url: "http://cdn.example/a.jar" }],
        ["a malformed hash", { hash: "zz" }],
    ])("leaves an entry with %s to the live lookup", (_name, patch) => {
        const { locked } = splitModList(modList, { schema: LOCK_SCHEMA, files: { [curseforgeKey(1, 2)]: { ...entry, ...patch } } });

        expect(locked).toEqual([]);
    });
});
