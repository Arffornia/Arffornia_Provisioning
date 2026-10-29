import { NexusMods, LoadJsonFromUrl } from "@arffornia/nexus_mods";
import {
    countIndexEntries,
    countModListEntries,
    Failure,
    formatFailures,
    libraryLoadFailures,
    registeredModFiles,
    resultFailures,
    verifyFilesOnDisk,
} from "./updateCheck";

export const DEFAULT_BASE_URL = "https://raw.githubusercontent.com/Arffornia/Arffornia_Network/refs/heads/main/";

/**
 * Sync one kind of configuration (mod list + external files) into `installBasePath`.
 *
 * @returns The list of failures; empty when everything was applied.
 * @throws If a mod list or index cannot be fetched or parsed.
 */
export async function updateConfig(
    installBasePath: string,
    baseUrl: string,
    kind: string,
    modDirName: string,
): Promise<Failure[]> {
    const externalFilesUrl = new URL(`config/${kind}/`, baseUrl).href;
    const modListUrl = new URL(`config/${kind}/modList.json`, baseUrl).href;
    const indexUrl = new URL("index.json", externalFilesUrl).href;

    // Fetch both lists ourselves first: we need the expected entry counts, and a fetch error
    // must fail the run before anything is touched.
    const [modListJson, indexJson] = await Promise.all([
        LoadJsonFromUrl(modListUrl),
        LoadJsonFromUrl(indexUrl),
    ]);
    const expected = countModListEntries(modListJson) + countIndexEntries(indexJson);

    const nexusMods = new NexusMods(installBasePath, callback, modDirName);
    await nexusMods.loadModsFromJson(modListJson);
    await nexusMods.loadExternalFiles(externalFilesUrl, indexJson);

    // Pre-update check: never run the update (which deletes unregistered mods) on a partial list.
    const loadFailures = libraryLoadFailures(nexusMods);
    const registered = registeredModFiles(nexusMods);
    if (loadFailures && loadFailures.length > 0) {
        return loadFailures;
    }
    if (registered && registered.length !== expected) {
        return [{
            stage: "lookup",
            name: `config/${kind}`,
            error: `${expected - registered.length} of ${expected} entries could not be resolved (see errors above)`,
        }];
    }

    const result: unknown = await nexusMods.updateMods(true, true);

    const reported = resultFailures(result);
    if (reported) {
        return reported;
    }

    // Nexus_Mods <= 1.0.12 returns void and swallows download errors: verify on disk.
    return registered ? verifyFilesOnDisk(installBasePath, registered) : [];
}

const callback = {
    onStep(step: string) {
        console.log(step);
    },
    onProgress(totalDownloaded: number, totalToDownload: number, name: string) {
        console.log(`totalDownloaded: ${totalDownloaded} | totalToDownload: ${totalToDownload} | name: ${name}`);
    },
};

export async function main(): Promise<number> {
    const installBasePath = process.env.INSTALL_BASE_PATH || "/data";
    const baseUrl = process.env.BASE_URL || DEFAULT_BASE_URL;
    const kind = process.env.KIND || "server";
    const modsDirName = process.env.MODS_DIR_NAME || "mods";

    try {
        const failures = await updateConfig(installBasePath, baseUrl, kind, modsDirName);

        if (failures.length > 0) {
            console.error(`Config update failed: ${failures.length} entr${failures.length === 1 ? "y" : "ies"} not applied:\n${formatFailures(failures)}`);
            return 1;
        }

        console.log("All config files successfully updated!");
        return 0;
    } catch (error) {
        console.error("Error while updating config files: ", error);
        return 1;
    }
}

if (require.main === module) {
    main().then(code => process.exit(code));
}
