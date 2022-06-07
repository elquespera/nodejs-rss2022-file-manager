import * as os from 'node:os';
import { invalidInputError } from './messages.js';


export default async function osInfo(flag) {
    try {
        flag = flag.slice(2);
        console.log(flag);
        switch (flag) {
            case 'EOL':
                return os.EOL;
            case 'cpus':
                const cpus = os.cpus();
                return `# of CPUs installed: ${cpus.length}${os.EOL}` +
                      cpus.map((cpu, index) => `CPU #${index}:${os.EOL}` +  
                                                `   Model: ${cpu.model}${os.EOL}` + 
                                                `   Speed: ${(cpu.speed / 1000).toFixed(2)}Hz`).
                    join(os.EOL);

            case 'homedir':
                return os.homedir();
            case 'username':
                return os.userInfo()?.username;
            case 'architecture':
                return os.arch();
            default:
                throw invalidInputError;
        }
    }
    catch(error) {

    }
}