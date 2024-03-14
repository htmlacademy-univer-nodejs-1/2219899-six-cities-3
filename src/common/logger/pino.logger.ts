import {Logger} from './logger.interface';
import {Logger as PinoLoggingInstance, pino} from 'pino';
import {injectable} from 'inversify';

@injectable()
export class PinoLogger implements Logger {
  private readonly logger: PinoLoggingInstance;

  constructor() {
    this.logger = pino();
  }

  info(message: string, ...args: unknown[]): void {
    this.logger.info(message, ...args);
  }

  warning(message: string, ...args: unknown[]): void {
    this.logger.warn(message, ...args);
  }

  error(message: string, error: Error, ...args: unknown[]): void {
    this.logger.error(error, message, ...args);
  }

  debug(message: string, ...args: unknown[]): void {
    this.logger.debug(message, ...args);
  }
}
