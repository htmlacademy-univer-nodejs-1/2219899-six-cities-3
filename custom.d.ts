import {TokenPayload} from './src/common/modules/auth/index.js';

declare module 'express-serve-static-core' {
  export interface Request {
    tokenPayload: TokenPayload;
  }
}
