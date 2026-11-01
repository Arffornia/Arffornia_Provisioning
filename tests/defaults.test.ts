import * as fs from "fs";
import * as path from "path";
import { DEFAULT_BASE_URL } from "../src/configUpdater";

describe("default BASE_URL", () => {
    it("points at this repository's main branch", () => {
        expect(DEFAULT_BASE_URL).toBe("https://raw.githubusercontent.com/Arffornia/Arffornia_Provisioning/refs/heads/main/");
    });

    it("matches the Dockerfile default", () => {
        const dockerfile = fs.readFileSync(path.join(__dirname, "..", "Dockerfile"), "utf-8");
        expect(dockerfile).toContain(`BASE_URL="${DEFAULT_BASE_URL}"`);
    });
});
