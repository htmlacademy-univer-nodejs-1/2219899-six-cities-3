import {NextFunction, Request, Response} from 'express';
import {Middleware} from './middleware.interface.js';
import {ClassConstructor, plainToInstance} from 'class-transformer';
import {validate} from 'class-validator';
import {ValidationError} from '../errors/index.js';
import {reduceValidationErrors} from '../../../utils/index.js';

export class ValidateDTOMiddleware implements Middleware {
  constructor(private dto: ClassConstructor<object>) {
  }

  async execute({body, path}: Request, _res: Response, next: NextFunction): Promise<void> {
    const dtoInstance = plainToInstance(this.dto, body);
    const errors = await validate(dtoInstance);

    if (errors.length > 0) {
      throw new ValidationError(`Validation error ${path}`, reduceValidationErrors(errors));
    }

    next();
  }
}
