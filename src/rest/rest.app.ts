import {inject, injectable} from 'inversify';
import {Component} from '../common/types';
import {getMongoURI} from '../common/utils';
import express, {Express} from 'express';
import {Logger} from '../common/libs/logger';
import {Config, RestSchema} from '../common/libs/config';
import {DatabaseClient} from '../common/libs/database_client';

@injectable()
export class RestApplication {
  private readonly INITIALIZATION_MESSAGE: string = 'Application initialization';

  private readonly logger: Logger;
  private readonly config: Config<RestSchema>;
  private readonly databaseClient: DatabaseClient;
  private readonly app: Express;

  constructor(
    @inject(Component.Logger) logger: Logger,
    @inject(Component.Config) config: Config<RestSchema>,
    @inject(Component.DatabaseClient) databaseClient: DatabaseClient
  ) {
    this.logger = logger;
    this.config = config;
    this.databaseClient = databaseClient;
    this.app = express();
  }

  private async initializeDatabase(): Promise<void> {
    const uri = getMongoURI(
      this.config.get('DATABASE_USER'),
      this.config.get('DATABASE_PASSWORD'),
      this.config.get('DATABASE_HOST'),
      this.config.get('DATABASE_PORT'),
      this.config.get('DATABASE_NAME')
    );

    await this.databaseClient.connect(uri);
  }

  public async init(): Promise<void> {
    this.logger.info(this.INITIALIZATION_MESSAGE);

    await this.initializeDatabase();
    this.logger.info('Init database completed');

    this.logger.info('Init middleware');
    await this.initMiddleware();
    this.logger.info('Middleware successfully initialized');

    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);
    await this.initServer();
    this.logger.info(`🚀 Express server is initialized and listening at ${this.config.get('PORT')} port`);
  }

  private async initServer(): Promise<void> {
    const port: number = this.config.get('PORT');
    this.app.listen(port);
  }

  private async initMiddleware(): Promise<void> {
    this.app.use(express.json());
  }
}
