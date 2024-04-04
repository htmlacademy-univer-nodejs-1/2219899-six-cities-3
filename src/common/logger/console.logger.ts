import {Logger} from './logger.interface';

export class ConsoleLogger implements Logger {
  info(message: string, ...args: unknown[]): void {
    console.info(message, args);
  }

  warning(message: string, ...args: unknown[]): void {
    console.warn(message, args);
  }

  error(message: string, error: Error, ...args: unknown[]): void {
    console.error(message, error, args);
  }

  debug(message: string, ...args: unknown[]): void {
    console.debug(message, args);
  }
}
