let userName = '';

const parseUserName = () => {
    const userNamePrefix = '--username=';
    const userNameArg = process.argv.find(arg => arg.startsWith(userNamePrefix));
    userName = userNameArg.slice(userNamePrefix.length);
}


const showWecomeMessage = () => {
    console.log(`Welcome to the File Manager, ${userName}!`);
}

const showExitMessage = () => {
    console.log(`Thank you for using File Manager, ${userName}`);
}

const showInvalidInputMessage = () => {
    console.log(`Invalid input`);
}

const showOperationFailedMessage = () => {
    console.log(`Operation failed`);
}

export { parseUserName, showWecomeMessage, showExitMessage, 
         showInvalidInputMessage, showOperationFailedMessage };