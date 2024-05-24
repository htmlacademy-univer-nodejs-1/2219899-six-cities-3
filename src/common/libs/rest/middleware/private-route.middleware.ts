import {Middleware} from './middleware.interface.js';
import {NextFunction, Request, Response} from 'express';
import {HTTPException} from '../errors/index.js';
import {StatusCodes} from 'http-status-codes';

export class PrivateRouteMiddleware implements Middleware {
  public async execute({tokenPayload}: Request, _res: Response, next: NextFunction): Promise<void> {
    if (!tokenPayload) {
      throw new HTTPException(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'PrivateRouteMiddleware'
      );
    }

    return next();
  }
}
