import {Command} from './command.interface';
import {RentOfferParser} from '../common/parser/offer.parser';
import chalk from 'chalk';
import {TsvReader} from '../common/reader/tsv.reader';
import {RentOffer} from '../common/types/offer.type';

class CommandImport implements Command {
  private readonly importErrorMessage: string = 'Error while importing file data.\nMessage error: ';
  private readonly rowCountMessage: string = 'Read lines count from the file: ';

  private readonly importArgumentErrorMessage: string =
    `Command "--import" accepts argument of filename.
Example: ./src/main.cli.ts --import mocks/offer_rent.tsv`;

  private readonly name: string = '--import';
  private readonly parser: RentOfferParser = new RentOfferParser();

  getName(): string {
    return this.name;
  }

  async process(..._params: string[]): Promise<void> {
    const [fileName] = _params;
    if (fileName === undefined) {
      console.error(chalk.red(this.importArgumentErrorMessage));
      return;
    }

    const tsvReader = new TsvReader();
    tsvReader.on('line', (line: string) => this.onLineEvent(line));
    tsvReader.on('end', (rowCount: number) => this.onEndEvent(rowCount));

    try {
      await tsvReader.readStream(fileName);
    } catch (e: unknown) {
      console.error(chalk.red.bold(this.importErrorMessage));
    }
  }

  private onLineEvent(line: string): void {
    const rent: RentOffer = this.parser.parse(line);
    if (rent === undefined) {
      return;
    }
    console.info(rent);
  }

  private onEndEvent(rowCount: number): void {
    console.log(chalk.greenBright(this.rowCountMessage + rowCount));
  }
}

export {CommandImport};
