// @ts-check
/**
 * Try running an npm script for each of the samples.
 */
const fs = require('fs');
const path = require('path');
const child_process = require('child_process');
const samples = [
    {
        path: "any-sync-core-node"
    }
];

function tryRun(scriptName, sample) {
    const packageJsonPath = path.join(sample.path, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath).toString());
    if (Object.keys(packageJson['scripts'] || {}).includes(scriptName)) {
        console.log(`=== Running ${scriptName} on ${path.basename(sample.path)} ===`)
        child_process.execSync(`npm run ${scriptName}`, {
            cwd: sample.path,
            stdio: 'inherit'
        });
    }
}

const scriptName = process.argv[2];
for (const sample of [...samples]) {
    tryRun(scriptName, sample);
}