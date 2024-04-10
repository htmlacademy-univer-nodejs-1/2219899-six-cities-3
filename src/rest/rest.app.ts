import {Logger} from '../common/logger';
import {Config, RestSchema} from '../common/config';
import {inject, injectable} from 'inversify';
import {Component} from '../common/types';
import {DatabaseClient} from '../common/database_client';
import {getMongoURI} from '../common/utils/database.util';

@injectable()
export class RestApplication {
  private readonly INITIALIZATION_MESSAGE: string = 'Application initialization';

  private readonly logger: Logger;
  private readonly config: Config<RestSchema>;
  private readonly databaseClient: DatabaseClient;

  constructor(
    @inject(Component.Logger) logger: Logger,
    @inject(Component.Config) config: Config<RestSchema>,
    @inject(Component.DatabaseClient) databaseClient: DatabaseClient
  ) {
    this.logger = logger;
    this.config = config;
    this.databaseClient = databaseClient;
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
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);

    await this.initializeDatabase();
    this.logger.info('Init database completed');
  }
}
