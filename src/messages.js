let userName = '';

const invalidInputError = new Error('Invalid input');

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
    console.log(invalidInputError.message);
}

const showOperationFailedMessage = () => {
    console.log(`Operation failed`);
}

const showCurrentDirMessage = (dir) => {
    console.log(`You are currently in ${dir}`);
}

export { invalidInputError, parseUserName, showWecomeMessage, 
        showExitMessage, 
         showInvalidInputMessage, showOperationFailedMessage,
         showCurrentDirMessage };