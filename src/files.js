import * as path from "node:path";
import * as fs from 'node:fs/promises';


import { currentDir } from "./dir.js";
import { InvalidInputError } from "./messages.js";

const catFile = async (source) => {
    let fileHandle;

    try {
        // Try to resolve the path to fileName
        const from = path.resolve(currentDir, source); 

        // Create file handle
        fileHandle = await fs.open(from, 'r');

        // Create file stream from the handle
        const fileStream = fileHandle.createReadStream({encoding: "utf8"});

        // Read Data from the stream
        let lines = '';
        for await (const chunk of fileStream) {
            lines += chunk.toString();
        }
        return lines;
    }
    catch(error) {
        if (error instanceof TypeError) {
            throw new InvalidInputError();
        } else 
            throw error;
    } 
    finally {
        await fileHandle?.close();
    }
}

const addFile = async (dest) => {
    let fileHandle;

    try {
        // Try to resolve the path to fileName
        const to = path.resolve(currentDir, dest); 

        // Create file handle
        fileHandle = await fs.open(to, 'wx');
    }
    catch(error) {
        if (error instanceof TypeError) {
            throw new InvalidInputError();
        } else 
            throw error;
    } 
    finally {
        await fileHandle?.close();
    }
}

export { catFile, addFile };