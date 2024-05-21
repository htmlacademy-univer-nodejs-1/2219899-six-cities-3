import {NextFunction, Request, Response} from 'express';
import {ExceptionFilter} from './exception-filter.interface.js';
import {inject, injectable} from 'inversify';
import {Component} from '../../../types/index.js';
import {Logger} from '../../logger/index.js';
import {BaseUserException} from '../../../modules/auth/errors/index.js';

@injectable()
export class AuthExceptionFilter implements ExceptionFilter {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger
  ) {
  }

  catch(error: Error, _req: Request, res: Response, next: NextFunction): void {
    if (!(error instanceof BaseUserException)) {
      return next(error);
    }
    this.logger.error(`[AuthModule] ${error.message}`, error);
    res.status(error.statusCode)
      .json({
        type: 'AUTHORIZATION',
        error: error.message
      });
  }
}
