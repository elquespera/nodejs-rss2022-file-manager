import * as readline from 'node:readline';

import parseCommand from "./parseCommand.js";
import { parseUserName, showInvalidInputMessage, 
        showWecomeMessage, showCurrentDirMessage, 
        showOperationFailedMessage, InvalidInputError } from "./messages.js";

import { doExit, setOnExit } from "./exit.js";
import { currentDir, up, cd, ls } from './dir.js';
import osInfo from './os-info.js';
import hash from './hash.js';
import { compress, decompress } from './archive.js';
import { catFile, addFile, renameFile, 
         copyFile, moveFile, removeFile } from './files.js';


const validCommands = {
    '.exit': doExit, 
    'up': up,
    'cd': cd,
    'ls': ls,
    'cat': catFile,
    'add': addFile,
    'rn': renameFile,
    'cp': copyFile,
    'mv': moveFile,
    'rm': removeFile,
    'os': osInfo,
    'hash': hash,
    'compress': compress,
    'decompress': decompress
}

parseUserName();
showWecomeMessage();
setOnExit();

showCurrentDirMessage(currentDir);

// Set up ReadLine Interface
const readLine = readline.createInterface(process.stdin, process.stdout);

// Main loop for per-line input
readLine.on('line', line => {
    const command = parseCommand(line);    
    const commandFunc = validCommands[command[0]]; 
    if (commandFunc) {
        commandFunc(...command.slice(1)).
        then(data => {
            if (data) 
                console.log(data);
            showCurrentDirMessage(currentDir);
        }, error => {
            if (error instanceof InvalidInputError) {
                showInvalidInputMessage();
            } else {
                showOperationFailedMessage();
            }
        });

    } else {
        showInvalidInputMessage();
    }
});
