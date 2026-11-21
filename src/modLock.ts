import axios from "axios";

export const LOCK_SCHEMA = 1;
const USER_AGENT = "Arffornia/Arffornia_Provisioning (modList lock generator)";
// The official API needs a key (CurseForge for Studios); the community proxy needs none but
// refuses datacenter IPs such as GitHub runners.
const CURSEFORGE_KEY = process.env.CURSEFORGE_API_KEY?.trim() || "";
const CURSEFORGE_API = CURSEFORGE_KEY ? "https://api.curseforge.com/v1" : "https://api.curse.tools/v1/cf";
const MODRINTH_API = "https://api.modrinth.com/v2";

export interface LockEntry {
    path: string;
    url: string;
    hashType: "sha1" | "md5";
    hash: string;
    size: number;
}

export interface ModLock {
    schema: number;
    files: Record<string, LockEntry>;
}

interface ModListLike {
    mods?: {
        curseforge?: { displayName: string; projectId: string | number; fileId: string | number }[];
        modrinth?: { displayName: string; versionId: string }[];
    };
}

export interface LockTarget {
    key: string;
    displayName: string;
    resolve: () => Promise<LockEntry>;
}

export function curseforgeKey(projectId: string | number, fileId: string | number): string {
    return `curseforge:${projectId}:${fileId}`;
}

export function modrinthKey(versionId: string): string {
    return `modrinth:${versionId}`;
}

/**
 * GitHub release entries are not locked: tags like `latest` or `edge` are rolling, so their
 * asset changes without the mod list changing. The launcher still resolves those live.
 */
export function lockTargets(modList: ModListLike, modDir = "mods"): LockTarget[] {
    const curseforge = (modList.mods?.curseforge ?? []).map(mod => ({
        key: curseforgeKey(mod.projectId, mod.fileId),
        displayName: mod.displayName,
        resolve: () => resolveCurseforge(mod.projectId, mod.fileId, modDir),
    }));
    const modrinth = (modList.mods?.modrinth ?? []).map(mod => ({
        key: modrinthKey(mod.versionId),
        displayName: mod.displayName,
        resolve: () => resolveModrinth(mod.versionId, modDir),
    }));
    return [...curseforge, ...modrinth];
}

export function plainFileName(name: unknown): string {
    if (typeof name !== "string" || name === "" || name === "." || name === ".." || /[\\/]/.test(name)) {
        throw new Error(`Unsafe file name from the API: ${JSON.stringify(name)}`);
    }
    return name;
}

async function resolveCurseforge(projectId: string | number, fileId: string | number, modDir: string): Promise<LockEntry> {
    const rep = await getWithRetry(`${CURSEFORGE_API}/mods/${projectId}/files/${fileId}`);
    const data = rep.data;
    if (!data.downloadUrl) {
        throw new Error("CurseForge gives no download URL for this file (third-party downloads disabled?)");
    }
    const sha1 = data.hashes?.find((h: { algo: number }) => h.algo === 1);
    const md5 = data.hashes?.find((h: { algo: number }) => h.algo === 2);
    const hash = sha1 ?? md5;
    if (!hash) {
        throw new Error("CurseForge gives no SHA-1 or MD5 for this file");
    }
    return {
        path: `${modDir}/${plainFileName(data.fileName)}`,
        url: data.downloadUrl,
        hashType: sha1 ? "sha1" : "md5",
        hash: hash.value,
        size: data.fileLength,
    };
}

async function resolveModrinth(versionId: string, modDir: string): Promise<LockEntry> {
    const rep = await getWithRetry(`${MODRINTH_API}/version/${versionId}`);
    // Same file choice as Nexus_Mods' ModrinthAPI, so the lock and the live path agree.
    const file = rep.data.files[0];
    return {
        path: `${modDir}/${plainFileName(file.filename)}`,
        url: file.url,
        hashType: "sha1",
        hash: file.hashes.sha1,
        size: file.size,
    };
}

/** Seconds or HTTP date, as RFC 9110 allows; null when absent or unreadable. */
export function retryAfterMs(header: unknown, now = Date.now()): number | null {
    if (typeof header !== "string" || header.trim() === "") {
        return null;
    }
    const seconds = Number(header);
    if (Number.isFinite(seconds)) {
        return Math.max(0, seconds * 1000);
    }
    const date = Date.parse(header);
    return Number.isNaN(date) ? null : Math.max(0, date - now);
}

const MAX_ATTEMPTS = 8;
const MAX_DELAY_MS = 60_000;

async function getWithRetry(url: string): Promise<{ data: any }> {
    for (let attempt = 1; ; attempt++) {
        try {
            const headers: Record<string, string> = { "User-Agent": USER_AGENT };
            if (CURSEFORGE_KEY && url.startsWith(CURSEFORGE_API)) {
                headers["x-api-key"] = CURSEFORGE_KEY;
            }
            const rep = await axios.get(url, { headers, timeout: 30_000 });
            return { data: url.startsWith(CURSEFORGE_API) ? rep.data.data : rep.data };
        } catch (error: any) {
            const status = error?.response?.status;
            const retryable = status === undefined || status === 408 || status === 429 || status >= 500;
            if (!retryable || attempt >= MAX_ATTEMPTS) {
                throw error;
            }
            const fromHeader = retryAfterMs(error?.response?.headers?.["retry-after"]);
            const backoff = Math.min(MAX_DELAY_MS, 1000 * 2 ** (attempt - 1));
            const delay = Math.min(MAX_DELAY_MS, fromHeader ?? backoff + Math.random() * 500);
            console.warn(`HTTP ${status ?? error?.code} on ${url}, retry ${attempt + 1}/${MAX_ATTEMPTS} in ${Math.round(delay)} ms`);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}

export interface LockResult {
    lock: ModLock;
    resolved: number;
    reused: number;
    failed: { key: string; displayName: string; error: string }[];
}

/**
 * Build the lock for a mod list. Entries already in `previous` are reused without any API call:
 * a CurseForge file id or a Modrinth version id never changes its file. Only new entries are
 * resolved, `concurrency` at a time.
 */
export async function buildLock(
    targets: LockTarget[],
    previous: ModLock | null,
    concurrency = 2,
): Promise<LockResult> {
    const files: Record<string, LockEntry> = {};
    const failed: LockResult["failed"] = [];
    let reused = 0;
    const toResolve: LockTarget[] = [];

    for (const target of targets) {
        const known = previous?.schema === LOCK_SCHEMA ? previous.files[target.key] : undefined;
        if (known) {
            files[target.key] = known;
            reused++;
        } else {
            toResolve.push(target);
        }
    }

    let next = 0;
    const worker = async () => {
        while (next < toResolve.length) {
            const target = toResolve[next++];
            try {
                files[target.key] = await target.resolve();
            } catch (error: any) {
                failed.push({ key: target.key, displayName: target.displayName, error: String(error?.message ?? error) });
            }
        }
    };
    await Promise.all(Array.from({ length: Math.max(1, Math.min(concurrency, toResolve.length)) }, worker));

    const sorted: Record<string, LockEntry> = {};
    for (const key of Object.keys(files).sort()) {
        sorted[key] = files[key];
    }
    return { lock: { schema: LOCK_SCHEMA, files: sorted }, resolved: toResolve.length - failed.length, reused, failed };
}
