import * as os from 'node:os';
import { InvalidInputError } from './messages.js';

export default async function osInfo(flag) {
    try {
        flag = flag.slice(2);
        switch (flag) {
            case 'EOL':
                return JSON.stringify(os.EOL);
            case 'cpus':
                const cpus = os.cpus();
                return `# of CPUs installed: ${cpus.length}${os.EOL}` +
                      cpus.map((cpu, index) => `CPU #${index + 1}:${os.EOL}` +  
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
                throw new InvalidInputError();
        }
    }
    catch(error) {
        throw error;
    }
}