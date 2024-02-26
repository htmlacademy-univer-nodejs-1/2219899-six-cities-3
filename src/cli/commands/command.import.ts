import {Command} from './command.interface';
import {RentOfferParser} from '../common/parser/offer.parser';
import {readFileSync} from 'node:fs';
import chalk from 'chalk';

class CommandImport implements Command {
  private readonly importMessage: string = 'Imported data:';
  private readonly importErrorMessage: string = 'Error while importing file data.\nMessage error: ';

  private readonly importArgumentErrorMessage: string =
    `Command "--import" accepts argument of filename.
Example: ./src/main.cli.ts --import mocks/offer_rent.tsv`;

  private readonly name: string = '--import';
  private readonly parser: RentOfferParser = new RentOfferParser();

  getName(): string {
    return this.name;
  }

  process(..._params: string[]): void {
    const [fileName] = _params;
    if (fileName === undefined) {
      console.error(chalk.red(this.importArgumentErrorMessage));
      return;
    }
    try {
      console.info(chalk.green(this.importMessage));
      for (const rent of this.parser.parse(readFileSync(fileName, 'utf-8'))) {
        console.info(rent);
      }
    } catch (e: unknown) {
      console.error(chalk.red.bold(this.importErrorMessage + e));
    }
  }
}

export {CommandImport};
