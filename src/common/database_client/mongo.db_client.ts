import {DatabaseClient} from './db_client.interface';
import * as Mongoose from 'mongoose';
import {Logger} from '../logger';
import {inject, injectable} from 'inversify';
import {Component} from '../types';
import {setTimeout} from 'node:timers/promises';

@injectable()
export class MongoClient implements DatabaseClient {
  private readonly ALREADY_CONNECTED: string = 'Connection is already opened';
  private readonly ALREADY_DISCONNECTED: string = 'Connection is already closed';

  private readonly CONNECTION_RETRIES: number = 5;
  private readonly CONNECTION_TIMEOUT: number = 1000;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  private mongoose: typeof Mongoose;
  private isConnected: boolean;
  private readonly logger: Logger;

  public constructor(@inject(Component.Logger) logger: Logger) {
    this.logger = logger;
    this.isConnected = false;
  }

  public isConnectionOpened(): boolean {
    return this.isConnected;
  }

  async connect(uri: string): Promise<void> {
    if (this.isConnectionOpened()) {
      throw new Error(this.ALREADY_CONNECTED);
    }
    let retries = 0;
    while (retries < this.CONNECTION_RETRIES) {
      try {
        this.logger.info('Trying to get connection to Mongo');
        this.mongoose = await Mongoose.connect(uri);
        this.isConnected = true;
        this.logger.info('Database connection is initialized');
        return;
      } catch (error) {
        retries += 1;
        this.logger.warning(`Failed to connect to database. Attempt ${retries}`, error as Error);
        await setTimeout(this.CONNECTION_TIMEOUT);
      }
    }
    throw new Error(`Unable to establish database connection after ${retries} retries`);
  }

  async disconnect(): Promise<void> {
    if (!this.isConnectionOpened()) {
      throw new Error(this.ALREADY_DISCONNECTED);
    }
    for (const connection of this.mongoose.connections) {
      console.log('Disconnecting');
      await connection.close(true);
    }
    this.isConnected = false;
    this.logger.info('Connection is closed');
  }
}