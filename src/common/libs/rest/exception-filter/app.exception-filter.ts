import {NextFunction, Request, Response} from 'express';
import {ExceptionFilter} from './exception-filter.interface.js';
import {inject, injectable} from 'inversify';
import {Logger} from '../../logger/index.js';
import {StatusCodes} from 'http-status-codes';
import {Component} from '../../../types/index.js';
import {createErrorObject} from '../../../utils/index.js';
import {ApplicationError} from '../types/index.js';

@injectable()
export class AppExceptionFilter implements ExceptionFilter {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger
  ) {
    this.logger.info('Register AppExceptionFilter');
  }

  public catch(error: Error, _req: Request, res: Response, _next: NextFunction): void {
    this.logger.error(error.message, error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(createErrorObject(ApplicationError.ServiceError, error.message));
  }
}
