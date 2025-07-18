import { NexusMods } from "@arffornia/nexus_mods";
import { exit } from "process";

/**
 * Update configuration 
 * @param {string} installBasePath 
 * @param {string} baseUrl 
 * @param {string} kind 
 * @param {string} modDirName
 */
async function updateConfig(installBasePath: string, baseUrl: string, kind: string, modDirName: string): Promise<void> {
    const externalFilesUrl = new URL(`config/${kind}/`, baseUrl).href;
    const modListUrl = new URL(`config/${kind}/modList.json`, baseUrl).href;

    const nexusMods = new NexusMods(installBasePath, callback, modDirName);

    try {
        await Promise.all([
            nexusMods.loadModsFromJsonUrl(modListUrl),
            nexusMods.loadExternalFilesFromJsonUrl(externalFilesUrl),
        ])

        await nexusMods.updateMods(true, true);

        console.log('All config files successfully updated!');
    } catch (error) {
        console.error('Error while updating config files: ', error);
        exit(1);
    }
}

const callback = {
    onStep(step) {
        console.log(step);
    },
    onProgress(totalDownloaded, totalToDownload, name) {
        console.log(`totalDownloaded: ${totalDownloaded} | totalToDownload: ${totalToDownload} | name: ${name}`);
    },

};

async function main() {
    const installBasePath = process.env.INSTALL_BASE_PATH || "/data";
    const baseUrl = process.env.BASE_URL || "https://raw.githubusercontent.com/Arffornia/Arffornia_Network/refs/heads/main/";
    const kind = process.env.KIND || "server";
    const modsDirName = process.env.MODS_DIR_NAME || "mods";

    await updateConfig(installBasePath, baseUrl, kind, modsDirName);
}

main();