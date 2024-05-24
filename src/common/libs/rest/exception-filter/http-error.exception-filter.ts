import {ExceptionFilter} from './exception-filter.interface.js';
import {inject, injectable} from 'inversify';
import {NextFunction, Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';
import {Component} from '../../../types/index.js';
import {Logger} from '../../logger/index.js';
import {HTTPException} from '../errors/index.js';
import {createErrorObject} from '../../../utils/index.js';
import {ApplicationError} from '../types/index.js';

@injectable()
export class HttpErrorExceptionFilter implements ExceptionFilter {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger
  ) {
    this.logger.info('Register HttpErrorExceptionFilter');
  }

  public catch(error: unknown, req: Request, res: Response, next: NextFunction): void {
    if (!(error instanceof HTTPException)) {
      return next(error);
    }

    this.logger.error(`[HttpErrorException]: ${req.path} # ${error.message}`, error);

    res
      .status(StatusCodes.BAD_REQUEST)
      .json(createErrorObject(ApplicationError.CommonError, error.message));
  }
}
