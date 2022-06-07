let userName = '';

class InvalidInputError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}
const invalidInputErrorMsg = 'Invalid input';

const parseUserName = () => {
    const userNamePrefix = '--username=';
    const userNameArg = process.argv.find(arg => arg.startsWith(userNamePrefix));
    userName = userNameArg.slice(userNamePrefix.length);
}

const showWecomeMessage = () => {
    console.log(`Welcome to the File Manager, ${userName}!`);
}

const showExitMessage = () => {
    console.log(`Thank you for using File Manager, ${userName}!`);
}

const showInvalidInputMessage = () => {
    console.log(invalidInputErrorMsg);
}

const showOperationFailedMessage = () => {
    console.log(`Operation failed`);
}

const showCurrentDirMessage = (dir) => {
    console.log(`You are currently in ${dir}`);
}

export { InvalidInputError, parseUserName, showWecomeMessage, 
        showExitMessage, 
         showInvalidInputMessage, showOperationFailedMessage,
         showCurrentDirMessage };