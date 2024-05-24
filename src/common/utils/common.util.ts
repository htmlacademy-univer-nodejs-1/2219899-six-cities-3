import {ValidationError} from 'class-validator';
import {ValidationErrorField} from '../libs/rest/types/index.js';
import {ApplicationError} from '../libs/rest/index.js';

export function reduceValidationErrors(errors: ValidationError[]): ValidationErrorField[] {
  return errors.map(({property, value, constraints}) => ({
    property,
    value,
    messages: constraints ? Object.values(constraints) : []
  }));
}

export function createErrorObject(
  errorType: ApplicationError,
  error: string,
  details: ValidationErrorField[] = []
) {
  return {errorType, error, details};
}

export function getFullServerPath(host: string, port: number) {
  return `http://${host}:${port}`;
}
