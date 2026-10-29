import * as fs from "fs";
import * as path from "path";

// The Arffornia mod reads secrets only from arffornia-server.toml, which it registers on dedicated servers only.
// These tests keep secrets out of anything shipped to players (launcher) and out of the shared COMMON file.

const configRoot = path.join(__dirname, "..", "config");
const SECRET_KEYS = /^\s*(clientId|clientSecret|username|password)\s*=/m;

function read(kind: string, file: string): string {
    return fs.readFileSync(path.join(configRoot, kind, "storage", "config", file), "utf8");
}

function listFiles(dir: string): string[] {
    return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
        const full = path.join(dir, entry.name);
        return entry.isDirectory() ? listFiles(full) : [full];
    });
}

describe("Arffornia mod config templates", () => {
    it.each(["server", "launcher"])("%s arffornia-common.toml holds no secrets", (kind) => {
        const common = read(kind, "arffornia-common.toml");

        expect(common).toMatch(/baseUrl\s*=\s*"https:\/\//);
        expect(common).not.toMatch(SECRET_KEYS);
        expect(common).not.toMatch(/\[database\]/);
    });

    it("the launcher never ships arffornia-server.toml", () => {
        const launcherFiles = listFiles(path.join(configRoot, "launcher", "storage"));
        expect(launcherFiles.some((file) => file.endsWith("arffornia-server.toml"))).toBe(false);

        const index = JSON.parse(fs.readFileSync(path.join(configRoot, "launcher", "index.json"), "utf8"));
        const paths: string[] = index.files.map((entry: { path: string }) => entry.path);
        expect(paths).not.toContain("config/arffornia-server.toml");
    });

    it("the server arffornia-server.toml uses placeholders, never literal secrets", () => {
        const server = read("server", "arffornia-server.toml");

        for (const key of ["clientId", "clientSecret", "username", "password"]) {
            const match = server.match(new RegExp(`^\\s*${key}\\s*=\\s*"([^"]*)"`, "m"));
            expect(match).not.toBeNull();
            expect(match![1]).toMatch(/^\$\{CFG_[A-Z_]+\}$/);
        }
    });

    it("the server index lists both mod config files", () => {
        const index = JSON.parse(fs.readFileSync(path.join(configRoot, "server", "index.json"), "utf8"));
        const paths: string[] = index.files.map((entry: { path: string }) => entry.path);

        expect(paths).toEqual(expect.arrayContaining(["config/arffornia-common.toml", "config/arffornia-server.toml"]));
    });
});
