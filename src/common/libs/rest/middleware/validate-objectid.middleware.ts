import {NextFunction, Request, Response} from 'express';
import {Types} from 'mongoose';
import {HTTPException} from '../errors';
import {StatusCodes} from 'http-status-codes';
import {Middleware} from './middleware.interface.js';


export class ValidateObjectIDMiddleware implements Middleware {
  constructor(private param: string) {
  }

  public execute({params}: Request, _res: Response, next: NextFunction): void {
    const objectID = params[this.param];

    if (Types.ObjectId.isValid(objectID)) {
      return next();
    }

    throw new HTTPException(
      StatusCodes.BAD_REQUEST,
      `${objectID} is invalid ObjectID`,
      'ValidateObjectIDMiddleware'
    );
  }
}
