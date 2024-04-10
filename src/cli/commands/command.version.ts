import {Command} from './command.interface';
import chalk from 'chalk';
import * as packageJson from '../../../package.json';

class CommandVersion implements Command {
  private readonly versionMessage: string = 'Project version is ';
  private readonly errorMessage: string = 'Error while reading project version';

  private readonly name: string = '--version';

  getName(): string {
    return this.name;
  }

  async process(..._params: string[]): Promise<void> {
    try {
      const version: string = this.getProjectVersion();
      console.info(chalk.greenBright(this.versionMessage + version));
    } catch (e: unknown) {
      console.error(this.errorMessage);
    }
  }

  private getProjectVersion(): string {
    return packageJson.version;
  }
}

export {CommandVersion};
