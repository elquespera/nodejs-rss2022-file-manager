import * as readline from 'node:readline'

import parseCommand from "./parseCommand.js";
import { parseUserName, showInvalidInputMessage, showWecomeMessage } from "./messages.js";
import { doExit, setOnExit } from "./exit.js";
import { read } from 'node:fs';


const validCommands = {
    '.exit': doExit, 
    'os': ''
}

parseUserName();
showWecomeMessage();
setOnExit();

//Set up ReadLine Interface
const readLine = readline.createInterface(process.stdin, process.stdout);

//Main loop for per-line input
readLine.on('line', line => {
    const command = parseCommand(line);    
    const commandFunc = validCommands[command[0]];    
    commandFunc ? commandFunc(...command.slice(1)) : showInvalidInputMessage();
});
