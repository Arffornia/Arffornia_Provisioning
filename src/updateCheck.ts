import * as crypto from "crypto";
import * as fs from "fs";
import * as path from "path";

/**
 * Failure-detection helpers for the config-updater.
 *
 * They work with both Nexus_Mods APIs:
 * - >= 1.1.0: `updateMods()` returns an `UpdateResult` ({ ok, failures, ... }) and lookup failures
 *   are available through `getLoadFailures()` before the update.
 * - <= 1.0.12: per-mod failures are only logged. We detect them ourselves: compare the number of
 *   resolved entries with the number of entries in the lists *before* updating (so nothing is
 *   deleted on a partial lookup), then verify every resolved file on disk after updating.
 */

export interface Failure {
    stage: string;
    name: string;
    error: string;
}

/** Minimal view of a Nexus_Mods `ModFile` (public getters available in every version). */
export interface ModFileLike {
    getFilePath(): string;
    getHash(): string;
    gethashType(): string;
}

/** Number of entries listed in a `modList.json` (all sources). */
export function countModListEntries(modListJson: string): number {
    const parsed = JSON.parse(modListJson);
    const mods = parsed?.mods ?? {};
    let count = 0;
    for (const key of ["curseforge", "modrinth", "github-releases"]) {
        if (Array.isArray(mods[key])) {
            count += mods[key].length;
        }
    }
    return count;
}

/** Number of files listed in an external `index.json`. */
export function countIndexEntries(indexJson: string): number {
    const parsed = JSON.parse(indexJson);
    return Array.isArray(parsed?.files) ? parsed.files.length : 0;
}

/**
 * Lookup failures as reported by the library (>= 1.1.0), or `null` if the library does not
 * expose them.
 */
export function libraryLoadFailures(nexusMods: unknown): Failure[] | null {
    const fn = (nexusMods as { getLoadFailures?: () => Failure[] })?.getLoadFailures;
    return typeof fn === "function" ? fn.call(nexusMods) : null;
}

/**
 * Resolved mod files of a NexusMods instance. The field is private in TypeScript but present at
 * runtime in every version; returns `null` if it cannot be read.
 */
export function registeredModFiles(nexusMods: unknown): ModFileLike[] | null {
    const files = (nexusMods as { modFiles?: unknown })?.modFiles;
    return Array.isArray(files) ? (files as ModFileLike[]) : null;
}

/**
 * Failures from an `updateMods()` return value (>= 1.1.0), or `null` for the old `void` API.
 */
export function resultFailures(result: unknown): Failure[] | null {
    if (result && typeof result === "object" && Array.isArray((result as { failures?: unknown }).failures)) {
        return (result as { failures: Failure[] }).failures;
    }
    return null;
}

function hashFile(filePath: string, algo: string): string {
    return crypto.createHash(algo).update(fs.readFileSync(filePath)).digest("hex");
}

/**
 * Verify that every resolved file exists under `basePath` and, when a hash is known, matches it.
 * Used with Nexus_Mods <= 1.0.12, which does not report download failures.
 */
export function verifyFilesOnDisk(basePath: string, files: ModFileLike[]): Failure[] {
    const failures: Failure[] = [];

    for (const file of files) {
        const fullPath = path.join(basePath, file.getFilePath());
        if (!fs.existsSync(fullPath)) {
            failures.push({ stage: "download", name: file.getFilePath(), error: "file missing after update" });
            continue;
        }

        const hashType = String(file.gethashType() ?? "NONE").toLowerCase();
        if (hashType === "none" || !file.getHash()) {
            continue;
        }

        const actual = hashFile(fullPath, hashType);
        if (actual.toLowerCase() !== file.getHash().toLowerCase()) {
            failures.push({
                stage: "download",
                name: file.getFilePath(),
                error: `hash mismatch (${hashType}): expected ${file.getHash()}, got ${actual}`,
            });
        }
    }

    return failures;
}

export function formatFailures(failures: Failure[]): string {
    return failures.map(f => `  - [${f.stage}] ${f.name}: ${f.error}`).join("\n");
}
