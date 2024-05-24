import {Command} from './command.interface.js';
import chalk from 'chalk';
import {version} from '../../../package.json';

class CommandVersion implements Command {
  private readonly versionMessage: string = 'Project version is ';
  private readonly errorMessage: string = 'Error while reading project version';

  private readonly name: string = '--version';

  getName(): string {
    return this.name;
  }

  async process(..._params: string[]): Promise<void> {
    try {
      console.info(chalk.greenBright(this.versionMessage + version));
    } catch (e: unknown) {
      console.error(this.errorMessage);
    }
  }
}

export {CommandVersion};
