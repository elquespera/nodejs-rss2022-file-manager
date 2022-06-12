import * as path from "node:path";
import * as stream from "node:stream/promises";
import * as fs from 'node:fs/promises';
import { createBrotliCompress, createBrotliDecompress } from 'node:zlib';

import { currentDir } from "./dir.js";
import { InvalidInputError } from "./messages.js";


//Perform compression or decompression
const performCompress = async (source, dest, compressStream) => {

    let sourceHandle, destHandle;

    try {
        //Throw custom error if no source or destination path is provided
        if (!source || !dest) 
            throw new InvalidInputError();

        // Try to resolve the path to fileName
        const from = path.resolve(currentDir, source); 
        const to = path.resolve(currentDir, dest);

        sourceHandle = await fs.open(from, 'r');
        destHandle = await fs.open(to, 'w');

        await stream.pipeline(
            sourceHandle.createReadStream(from),
            compressStream(),
            destHandle.createWriteStream(to)
        );
    }
    catch (error) {
       throw error;
    }
    finally {
        await sourceHandle?.close();
        await destHandle?.close();
    }
}

// Wrappers for compress / decompress functions
const compress = async (source, dest) => {
    return await performCompress(source, dest, createBrotliCompress);
}

const decompress = async (source, dest) => {
    return await performCompress(source, dest, createBrotliDecompress);
}

export { compress, decompress };