import {Reader} from './reader.interface';
import {createReadStream, ReadStream} from 'node:fs';
import {resolve} from 'node:path';
import EventEmitter from 'node:events';

export class TsvReader extends EventEmitter implements Reader {
  private readonly CHUNK_SIZE: number = 16_384; // kilobytes

  public async readStream(fileName: string): Promise<void> {
    const streamRead: ReadStream = createReadStream(
      resolve(fileName),
      {
        encoding: 'utf-8',
        highWaterMark: this.CHUNK_SIZE
      }
    );
    let remainingData = '';
    let nextLinePosition = -1;
    let rowCount = 0;

    for await (const chunk of streamRead) {
      remainingData += chunk.toString();

      while ((nextLinePosition = remainingData.indexOf('\n')) >= 0) {
        const completeRow = remainingData.slice(0, nextLinePosition + 1);
        remainingData = remainingData.slice(++nextLinePosition);
        rowCount++;
        this.emit('line', completeRow);
      }
    }
    this.emit('end', rowCount);
  }
}
