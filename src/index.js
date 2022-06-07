import parseCommand from "./parseCommand.js";
import { parseUserName, showWecomeMessage } from "./messages.js";

const validCommands = {
    os: ''
}

parseUserName();
showWecomeMessage();

process.stdin.on("data", data => {
    const command = parseCommand(data.toString());
    console.log(command);
});