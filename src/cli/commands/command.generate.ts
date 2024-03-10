import {Command} from './command.interface';
import axios from 'axios';
import {OfferGenerator} from '../common/generator/offer.generator';
import {ServerMockData} from '../common/types/server_mock_data.type';
import {TsvWriter} from '../common/writer/tsv.writer';
import chalk from 'chalk';

export class CommandGenerate implements Command {
  private readonly SERVER_ERROR_MESSAGE: string = 'Error while sending request to a json server';
  private readonly name: string = '--generate';

  getName(): string {
    return this.name;
  }

  async process(..._params: string[]): Promise<void> {
    const [offerCount, filePath, url] = _params;
    let jsonServerData: ServerMockData;
    try {
      jsonServerData = await this.loadRentDataFromJsonServer(url);
    } catch (e: unknown) {
      console.log(chalk.red(this.SERVER_ERROR_MESSAGE));
      return;
    }
    const generatedData: string[] = this.generateData(Number(offerCount), jsonServerData);
    await this.writeData(filePath, generatedData);
  }

  private async loadRentDataFromJsonServer(url: string): Promise<ServerMockData> {
    const responseData = await axios.get(url);
    return responseData.data as ServerMockData;
  }

  private generateData(count: number, choicesData: ServerMockData): string[] {
    const result: string[] = [];
    const generator = new OfferGenerator(choicesData);
    for (let i = 0; i < count; i++) {
      result.push(generator.generate());
    }
    return result;
  }

  private async writeData(filePath: string, writeableRows: string[]): Promise<void> {
    const tsvWriter = new TsvWriter(filePath);
    for (const row of writeableRows) {
      await tsvWriter.write(row);
    }
  }
}
