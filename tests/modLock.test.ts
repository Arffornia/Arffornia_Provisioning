import { buildLock, curseforgeKey, LockEntry, LockTarget, lockTargets, LOCK_SCHEMA, plainFileName, retryAfterMs } from "../src/modLock";

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
