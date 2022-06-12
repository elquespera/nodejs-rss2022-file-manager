import * as os from "node:os";
import * as path from "node:path";
import  *  as fs from 'node:fs/promises';
import { InvalidInputError } from "./messages.js";



const homeDir = os.homedir();
let currentDir = homeDir;

const cd = async (newPath) => {
    let dir;
    try {
        //Throw custom error if no path is provided
        if (!newPath) 
            throw new InvalidInputError();

        newPath = path.resolve(currentDir, newPath);
        dir = await fs.opendir(newPath);
        currentDir = newPath;
    }
    catch (error) {
        throw error;
    }
    finally {
        dir?.close();
    }
}

const up = async () => {
    // Go up level using cd function
    await cd('..');
}

const ls = async () => {
    try {
        //Get dir content
        const dir = await fs.readdir(currentDir);
        
        //Join file list with EOL
        return dir.join(os.EOL);
    }
    catch (error) {
       throw error;
    }    
}

export { currentDir, up, cd, ls };