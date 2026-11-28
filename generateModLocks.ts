import fs from 'fs';
import path from 'path';
import { buildLock, lockTargets, ModLock } from './src/modLock';

// Writes config/<kind>/modList.lock.json so players and servers never ask the mod APIs at launch.
// Failed entries are left out: clients resolve those live, and the job fails so someone looks.
async function generate(kind: string): Promise<boolean> {
    const dir = path.join(__dirname, 'config', kind);
    const lockPath = path.join(dir, 'modList.lock.json');
    const modList = JSON.parse(fs.readFileSync(path.join(dir, 'modList.json'), 'utf-8'));
    const previous: ModLock | null = fs.existsSync(lockPath)
        ? JSON.parse(fs.readFileSync(lockPath, 'utf-8'))
        : null;

    const { lock, resolved, reused, failed } = await buildLock(lockTargets(modList), previous);
    fs.writeFileSync(lockPath, JSON.stringify(lock, null, 2) + '\n');

    console.log(`${kind}: ${Object.keys(lock.files).length} locked (${reused} reused, ${resolved} resolved)`);
    for (const f of failed) {
        console.error(`${kind}: could not lock ${f.displayName} (${f.key}): ${f.error}`);
    }
    return failed.length === 0;
}

async function main() {
    const kinds = process.argv.slice(2);
    let ok = true;
    for (const kind of kinds.length > 0 ? kinds : ['launcher', 'server']) {
        ok = (await generate(kind)) && ok;
    }
    process.exit(ok ? 0 : 1);
}

main();
