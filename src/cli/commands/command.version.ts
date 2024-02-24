import {Command} from './command.interface';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import chalk from 'chalk';

class CommandVersion implements Command {
  private readonly versionMessage: string = 'Project version is ';
  private readonly errorMessage: string = 'Error while reading project version';
  private readonly packageJsonFileName: string = 'package.json';

  private readonly name: string = '--version';

  getName(): string {
    return this.name;
  }

  process(..._params: string[]): void {
    try {
      const version: string = this.getProjectVersion();
      console.info(chalk.greenBright(this.versionMessage + version));
    } catch (e: unknown) {
      console.error(this.errorMessage);
    }
  }

  private getProjectVersion(): string {
    const packageJson = JSON.parse(readFileSync(resolve(this.packageJsonFileName), 'utf-8'));
    if (typeof packageJson !== 'object' || !Object.hasOwn(packageJson, 'version')) {
      throw new Error();
    }
    return packageJson.version;
  }
}

export {CommandVersion};
