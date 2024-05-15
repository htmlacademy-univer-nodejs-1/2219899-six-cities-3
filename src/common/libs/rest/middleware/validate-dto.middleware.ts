import {NextFunction, Request, Response} from 'express';
import {Middleware} from './middleware.interface.js';
import {StatusCodes} from 'http-status-codes';
import {ClassConstructor, plainToInstance} from 'class-transformer';
import {validate} from 'class-validator';

export class ValidateDTOMiddleware implements Middleware {
  constructor(private dto: ClassConstructor<object>) {
  }

  async execute({body}: Request, res: Response, next: NextFunction): Promise<void> {
    const dtoInstance = plainToInstance(this.dto, body);
    const errors = await validate(dtoInstance);

    if (errors.length > 0) {
      res.status(StatusCodes.BAD_REQUEST).send(errors);
      return;
    }

    next();
  }
}
