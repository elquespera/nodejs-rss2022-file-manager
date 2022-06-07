import parseCommand from "./parseCommand.js";
import { showWecomeMessage } from "./messages.js";

const validCommands = {
    os: ''
}

process.stdin.on("data", data => {
    const command = parseCommand(data.toString());
    console.log(command);
});