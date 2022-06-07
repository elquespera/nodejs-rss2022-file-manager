import * as fs from 'node:fs/promises';
import * as path from "node:path";
const { createHash } = await import('crypto');

import { currentDir } from "./dir.js";
import { InvalidInputError } from "./messages.js";

export default async function hash(fileName) {
    try {
        // Try to resolve the path to fileName
        const from = path.resolve(currentDir, fileName); 

        // Create hash transform stream
        const hashStream = createHash('sha256');

        // Read data from file
        const data = await fs.readFile(from, { encoding: 'utf8' });

        // Feed data to hash stream
        hashStream.update(data);

        // Return calculated hash as hex
        return hashStream.digest('hex');
    }
    catch(error) {
        if (error instanceof TypeError) {
            throw new InvalidInputError();
        } else 
            throw error;
    } 
}