
const showWecomeMessage = (userName) => {
    console.log(`Welcome to the File Manager, ${userName}`);
}

const showExitMessage = (userName) => {
    console.log(`Thank you for using File Manager, ${userName}`);
}

const showInvalidInputMessage = () => {
    console.log(`Invalid input`);
}

const showOperationFailedMessage = () => {
    console.log(`Operation failed`);
}

export { showWecomeMessage, showExitMessage, 
        showInvalidInputMessage, showOperationFailedMessage };