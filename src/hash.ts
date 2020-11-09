import * as fs from "fs";
import { promisify } from "util";
import * as crypto from "crypto";

import * as ghCore from "@actions/core";

const HASH_ALG = "sha256";

export async function hash(file: string): Promise<string> {
    ghCore.info(`${HASH_ALG} hashing ${file}`)
    const contents = await promisify(fs.readFile)(file);
    const sha = crypto.createHash(HASH_ALG);
    sha.update(contents);
    const result = sha.digest().toString("base64");
    ghCore.info(`Hash: ${result}`);
    return result;
}
