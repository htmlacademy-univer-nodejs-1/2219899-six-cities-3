import {NextFunction, Request, Response} from 'express';
import {ExceptionFilter} from './exception-filter.interface.js';
import {inject, injectable} from 'inversify';
import {Logger} from '../../logger';
import {HTTPException} from '../errors';
import {StatusCodes} from 'http-status-codes';
import {Component} from '../../../types';

@injectable()
export class AppExceptionFilter implements ExceptionFilter {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger
  ) {
  }

  catch(error: Error, req: Request, res: Response, next: NextFunction): void {
    if (error instanceof HTTPException) {
      this.handleHTTPException(error, req, res, next);
      return;
    }
    this.handleServerError(error, req, res, next);
  }

  private handleHTTPException(error: HTTPException, _req: Request, res: Response, _next: NextFunction) {
    this.logger.error(`[${error.detail}]: ${error.statusCode} - ${error.message}`, error);
    res
      .status(error.statusCode)
      .json({detail: error.message || ''});
  }

  private handleServerError(error: Error, _req: Request, res: Response, _next: NextFunction) {
    this.logger.error(error.message, error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({detail: error.message || ''});
  }
}
