import {inject, injectable} from 'inversify';
import {Component} from '../common/types/index.js';
import {getMongoURI} from '../common/utils/index.js';
import express, {Express} from 'express';
import {Logger} from '../common/libs/logger/index.js';
import {Config, RestSchema} from '../common/libs/config/index.js';
import {DatabaseClient} from '../common/libs/database_client/index.js';
import {Controller, ExceptionFilter} from '../common/libs/rest/index.js';
import {ParseTokenMiddleware} from '../common/libs/rest/middleware/index.js';

@injectable()
export class RestApplication {
  private readonly INITIALIZATION_MESSAGE: string = 'Application initialization';

  private readonly logger: Logger;
  private readonly config: Config<RestSchema>;
  private readonly databaseClient: DatabaseClient;
  private readonly offerController: Controller;
  private readonly userController: Controller;
  private readonly commentController: Controller;
  private readonly app: Express;

  constructor(
    @inject(Component.Logger) logger: Logger,
    @inject(Component.Config) config: Config<RestSchema>,
    @inject(Component.DatabaseClient) databaseClient: DatabaseClient,
    @inject(Component.OfferController) offerController: Controller,
    @inject(Component.UserController) userController: Controller,
    @inject(Component.CommentController) commentController: Controller,
    @inject(Component.ExceptionFilter) private readonly appExceptionFilter: ExceptionFilter,
    @inject(Component.AuthExceptionFilter) private readonly authExceptionFilter: ExceptionFilter
  ) {
    this.logger = logger;
    this.config = config;
    this.databaseClient = databaseClient;
    this.offerController = offerController;
    this.userController = userController;
    this.commentController = commentController;
    this.app = express();
  }

  private async initializeDatabase(): Promise<void> {
    const uri = getMongoURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME')
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

    this.logger.info('Init Controllers');
    await this.initControllers();
    this.logger.info('Controllers are initialized');

    this.logger.info('Init exception filters');
    await this.initExceptionFilters();
    this.logger.info('Exception filters initialization completed');

    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);
    await this.initServer();
    this.logger.info(`🚀 Express server is initialized and listening at ${this.config.get('PORT')} port`);
  }

  private async initServer(): Promise<void> {
    const port: number = this.config.get('PORT');
    this.app.listen(port);
  }

  private async initMiddleware(): Promise<void> {
    const authenticateMiddleware = new ParseTokenMiddleware(this.config.get('JWT_SECRET'));

    this.app.use(express.json());
    this.app.use('/upload', express.static(this.config.get('UPLOAD_DIRECTORY')));
    this.app.use(authenticateMiddleware.execute.bind(authenticateMiddleware));
  }

  private async initControllers(): Promise<void> {
    this.app.use('', this.userController.router);
    this.app.use('', this.offerController.router);
    this.app.use('', this.commentController.router);
  }

  private async initExceptionFilters() {
    this.app.use(this.authExceptionFilter.catch.bind(this.authExceptionFilter));
    this.app.use(this.appExceptionFilter.catch.bind(this.appExceptionFilter));
  }
}
