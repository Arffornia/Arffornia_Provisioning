import { NexusMods } from "@arffornia/nexus_mods";
import { exit } from "process";

/**
 * Update configuration 
 * @param {string} installBasePath 
 * @param {string} baseUrl 
 * @param {string} kind 
 */
async function updateConfig(installBasePath: string, baseUrl: string, kind: string): Promise<void> {
    const externalFilesUrl = new URL(`config/${kind}/`, baseUrl).href;
    const modListUrl = new URL(`config/${kind}/modList.json`, baseUrl).href;

    const nexusMods = new NexusMods(installBasePath);

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

async function main() {
    const args = process.argv.slice(2);

    if (args.length !== 3) {
        console.info("Usage: installBasePath baseUrl kind");
        exit(1);
    }

    const [ installBasePath, baseUrl, kind ] = args;

    await updateConfig(installBasePath, baseUrl, kind);
}

main();