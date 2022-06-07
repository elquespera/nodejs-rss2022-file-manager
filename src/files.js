import * as path from "node:path";
import * as fs from 'node:fs/promises';
import * as stream from "node:stream/promises";
import { constants } from 'node:fs';


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

const renameFile = async (source, dest) => {
    // const dummyMessage
    // try {
    //     // Try to resolve the paths
    //     const from = path.resolve(currentDir, source); 
    //     const to = path.resolve(currentDir, dest);

    //     await fs.access(to, fs.constants.F_OK);
    //     throw new Error('Dest file already exists');       
    // }
    // catch(error) {
    //     if (error instanceof TypeError) {
    //         throw new InvalidInputError();
    //     } else if 

    //         throw error;
    // } 
}

const copyFile = async (source, dest) => {
    let sourceHandle, destHandle;

    try {
        // Try to resolve the path to fileName
        const from = path.resolve(currentDir, source); 
        const to = path.resolve(currentDir, dest);

        sourceHandle = await fs.open(from, 'r');
        destHandle = await fs.open(to, 'w');

        await stream.pipeline(
            sourceHandle.createReadStream(from),
            destHandle.createWriteStream(to)
        );
    }
    catch (error) {
       if (error instanceof TypeError) {
            throw new InvalidInputError();
        } else 
            throw error;
    }
    finally {
        await sourceHandle?.close();
        await destHandle?.close();
    }    
}

const moveFile = async (source, dest) => {
    try {
        await copyFile(source, dest);
        await removeFile(source, dest);
    }
    catch (error) {
       if (error instanceof TypeError) {
            throw new InvalidInputError();
        } else 
            throw error;
    }
}

const removeFile = async (source) => {
    try {
        // Try to resolve the path to fileName
        const from = path.resolve(currentDir, source); 

        // Remove file
        await fs.unlink(from);
    }
    catch (error) {
        console.log(error);
       if (error instanceof TypeError) {
            throw new InvalidInputError();
        } else 
            throw error;
    }
}



export { catFile, addFile, renameFile,
         copyFile, moveFile, removeFile };