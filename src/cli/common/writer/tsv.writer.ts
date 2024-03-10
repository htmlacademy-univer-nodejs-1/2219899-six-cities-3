import {WriterInterface} from './writer.interface';
import {createWriteStream, WriteStream} from 'node:fs';
import {resolve as filePathResolve} from 'node:path';

export class TsvWriter implements WriterInterface {
  private readonly writeStream: WriteStream;

  constructor(filePath: string) {
    this.writeStream = createWriteStream(
      filePathResolve(filePath),
      {
        encoding: 'utf-8',
        flags: 'w',
        autoClose: true
      }
    );
  }

  public async write(row: string): Promise<unknown> {
    const isWriteSuccess: boolean = this.writeStream.write(`${row}\n`);
    if (!isWriteSuccess) {
      return new Promise((resolve) => {
        this.writeStream.once('drain', () => resolve(true));
      });
    }
    return Promise.resolve();
  }
}
