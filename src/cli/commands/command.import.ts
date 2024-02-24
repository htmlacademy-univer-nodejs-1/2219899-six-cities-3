import {Command} from './command.interface';
import {RentOfferParser} from '../common/parser/offer.parser';
import {readFileSync} from 'node:fs';
import {RentOffer} from '../common/types/offer.type';
import chalk from 'chalk';

class CommandImport implements Command {
  private readonly importMessage: string = 'Imported data:';
  private readonly importErrorMessage: string = 'Error while importing file data.\nMessage error: ';
  private readonly name: string = '--import';
  private readonly parser: RentOfferParser = new RentOfferParser();

  getName(): string {
    return this.name;
  }

  process(..._params: string[]): void {
    const [fileName] = _params;
    try {
      console.info(chalk.green(this.importMessage));
      console.info(this.prepareData(fileName));
    } catch (e: unknown) {
      console.error(chalk.red.bold(this.importErrorMessage + e));
    }
  }

  private prepareData(fileName: string): RentOffer[] {
    return this.parser.parse(readFileSync(fileName, 'utf-8'));
  }
}

export {CommandImport};
