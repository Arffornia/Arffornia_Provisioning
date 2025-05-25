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
    const args = process.argv.slice(2);

    if (args.length !== 4) {
        console.info("Usage: installBasePath baseUrl kind modDirName");
        exit(1);
    }

    const [ installBasePath, baseUrl, kind, modDirName ] = args;

    await updateConfig(installBasePath, baseUrl, kind, modDirName);
}

main();