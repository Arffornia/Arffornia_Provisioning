import { generateIndex } from '@arffornia/nexus_mods';
import path from 'path';

async function generateIndexHandler(kind: string) {
    const storageDir = path.join(__dirname, 'config', kind, 'storage');
    const outputFile = path.join(__dirname, 'config', kind, 'index.json');

    try {
        console.log(`🔄 Generating index for: ${kind}`);
        await generateIndex(storageDir, outputFile);
        console.log(`✅ ${kind} index generation completed successfully.`);
    }
    catch (error) {
        console.error(`❌ Failed to generate ${kind} index:`, error);
        process.exit(1);
    }
}

async function main() {
    const args = process.argv.slice(2);

    const folders = args.length > 0 ? args : [ 'proxy', 'server', 'launcher' ];

    await Promise.all(
        folders.map((folder) => generateIndexHandler(folder))
    );
}

main();
