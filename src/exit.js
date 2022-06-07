import { showExitMessage } from "./messages.js";

const doExit = () => {
    process.exit();
}

const setOnExit = () => {
    process.on('exit', code => {
        showExitMessage();
    });
}


export { doExit, setOnExit };