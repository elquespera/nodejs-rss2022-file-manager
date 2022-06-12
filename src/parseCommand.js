export default function parseCommand(command) {
    // Split command by spaces, at least one
    command = command.trim().split(/ +/);

    // Check for quotes around file names, single & double supported
    // no nesting support
    if (command.length > 1) {
        const parameters = [];
        let openingQuoteIndex = -1;
        for (let i = 1; i < command.length; i++) {
            if (openingQuoteIndex > 0) {
                if (command[i].match(/("|')$/) || i === command.length - 1) {
                    if (!command[i].match(/("|')$/)) { 
                        command[i] += '"';
                    }
                    parameters.push(command
                                    .slice(openingQuoteIndex, i + 1)
                                    .join(' ')
                                    .slice(1, -1)
                    );
                    openingQuoteIndex = -1;
                }
            } else
            if (command[i].match(/^("|')/)) {
                openingQuoteIndex = i;
            } else {
                parameters.push(command[i]);
            }
        }          
        command = [command[0], ...parameters];

    }
    return command;
}