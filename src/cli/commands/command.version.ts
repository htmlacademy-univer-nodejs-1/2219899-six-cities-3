import {Command} from './command.interface.js';
import chalk from 'chalk';
import {resolve} from 'node:path';
import {readFileSync} from 'node:fs';

type PackageJSONConfig = {
  version: string;
}

function isPackageJSONConfig(value: unknown): value is PackageJSONConfig {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    Object.hasOwn(value, 'version')
  );
}

class CommandVersion implements Command {
  private readonly filePath: string = './package.json';
  private readonly versionMessage: string = 'Project version is ';
  private readonly errorMessage: string = 'Error while reading project version';

  private readonly name: string = '--version';

  getName(): string {
    return this.name;
  }

  async process(..._params: string[]): Promise<void> {
    try {
      console.info(chalk.greenBright(this.versionMessage + this.readVersion()));
    } catch (e: unknown) {
      console.error(this.errorMessage);
    }
  }

  private readVersion(): string {
    const jsonContent = readFileSync(resolve(this.filePath), 'utf-8');
    const importedContent: unknown = JSON.parse(jsonContent);

    if (!isPackageJSONConfig(importedContent)) {
      throw new Error('Failed to parse json content.');
    }

    return importedContent.version;
  }
}

export {CommandVersion};
