import {HTTPException} from '../../../libs/rest/index.js';


export class BaseUserException extends HTTPException {
  constructor(httpStatusCode: number, message: string) {
    super(httpStatusCode, message);
  }
}
