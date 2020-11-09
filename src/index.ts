
import * as ghCore from "@actions/core";
import * as ghIO from "@actions/io";
import * as ghExec from "@actions/exec";
import * as path from "path";

import { Inputs } from "./inputs";
import { hash }  from "./hash";

async function moveBundleFile(bundleFilePath: string): Promise<string> {
    const bundleFileName = path.basename(bundleFilePath);
    const bundleFileDir = path.dirname(bundleFilePath);

    const backupPath = path.join(bundleFileDir, bundleFileName + ".backup");
    ghCore.info(`Move ${bundleFilePath} to ${backupPath}`);
    await ghIO.mv(bundleFilePath, backupPath);
    return backupPath;
}

async function run() {
    const bundleFile = ghCore.getInput(Inputs.BUNDLE_FILE, { required: true });
    const bundleCmd = ghCore.getInput(Inputs.BUNDLE_COMMAND, { required: true });

    const bundleFileHash = await hash(bundleFile);
    await moveBundleFile(bundleFile);

    await ghExec.exec(bundleCmd);
    const newBundleFileHash = await hash(bundleFile);

    ghCore.info(`Comparing hashes...`);
    ghCore.info(`Committed hash: ${bundleFileHash}`);
    ghCore.info(`Generated hash: ${newBundleFileHash}`);
    if (bundleFileHash !== newBundleFileHash) {
        ghCore.setFailed(`Hashes did not match. Run "${bundleCmd}" to update your bundle.`);
        return;
    }
    ghCore.info(`Hashes matched!`);
}

run()
.catch(ghCore.setFailed);
