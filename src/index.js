import * as readline from 'node:readline';
import * as os from "node:os";

import parseCommand from "./parseCommand.js";
import { parseUserName, showInvalidInputMessage, showWecomeMessage, showCurrentDirMessage } from "./messages.js";
import { doExit, setOnExit } from "./exit.js";
import { read } from 'node:fs';


const validCommands = {
    '.exit': doExit, 
    'os': ''
}

const currentDir = os.homedir();

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
        commandFunc(...command.slice(1));
        showCurrentDirMessage();
    } else {
        showInvalidInputMessage();
    }
});
