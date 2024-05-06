import {Response, Router} from 'express';
import {Controller, Route} from '../types';
import {Logger} from '../../logger';
import {StatusCodes} from 'http-status-codes';

export class BaseController implements Controller {
  readonly router: Router;
  protected readonly logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
    this.router = Router();
  }

  addRoute(route: Route): void {
    this.router[route.method](route.path, route.handler.bind(this));
    this.logger.info(`Route registered: ${route.method.toUpperCase()} ${route.path}`);
  }

  send<T>(res: Response, statusCode: number, data: T): void {
    res.type('application/json')
      .status(statusCode)
      .json(data);
  }

  ok<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.OK, data);
  }

  created<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.CREATED, data);
  }

  noContent<T>(res: Response, data?: T): void {
    this.send(res, StatusCodes.NO_CONTENT, data);
  }

  notImplemented<T>(res: Response, data?: T): void {
    this.send(res, StatusCodes.NOT_IMPLEMENTED, data);
  }
}
