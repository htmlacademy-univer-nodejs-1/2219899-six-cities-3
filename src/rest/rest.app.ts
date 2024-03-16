import {Logger} from '../common/logger';
import {Config, RestSchema} from '../common/config';
import {inject, injectable} from 'inversify';
import {Component} from '../common/types';

@injectable()
export class RestApplication {
  private readonly INITIALIZATION_MESSAGE: string = 'Application initialization';

  private readonly logger: Logger;
  private readonly config: Config<RestSchema>;

  constructor(
    @inject(Component.Logger) logger: Logger,
    @inject(Component.Config) config: Config<RestSchema>
  ) {
    this.logger = logger;
    this.config = config;
  }

  public async init(): Promise<void> {
    this.logger.info(this.INITIALIZATION_MESSAGE);
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);
  }
}
