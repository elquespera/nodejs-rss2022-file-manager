import * as os from "node:os";
import * as path from "node:path";
import  *  as fs from 'node:fs/promises';
import { resolve } from "node:path";
import { dir } from "node:console";

const homeDir = os.homedir();
let currentDir = homeDir;

const up = async () => {
    currentDir = path.resolve(currentDir, '..');
}

const cd = async (newPath) => {
    newPath = path.resolve(currentDir, newPath);
    let dir;
    try {
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