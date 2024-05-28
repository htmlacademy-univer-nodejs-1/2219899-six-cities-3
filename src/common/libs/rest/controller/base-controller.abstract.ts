import {Response, Router} from 'express';
import {Controller, Route} from '../types/index.js';
import {Logger} from '../../logger/index.js';
import {StatusCodes} from 'http-status-codes';
import asyncHandler from 'express-async-handler';
import {inject, injectable} from 'inversify';
import {Component} from '../../../types/index.js';
import {PathTransformer} from '../transform/index.js';

@injectable()
export abstract class BaseController implements Controller {
  protected readonly logger: Logger;

  @inject(Component.PathTransformer)
  private pathTransformer: PathTransformer;

  readonly router: Router;

  constructor(
    logger: Logger
  ) {
    this.logger = logger;
    this.router = Router();
  }

  addRoute(route: Route): void {
    const wrapperAsyncHandler = asyncHandler(route.handler.bind(this));
    const middlewareHandlers = route.middlewares?.map(
      (middleware) => asyncHandler(middleware.execute.bind(middleware))
    );
    const handlers = middlewareHandlers ? [...middlewareHandlers, wrapperAsyncHandler] : wrapperAsyncHandler;
    this.router[route.method](route.path, handlers);
    this.logger.info(`Route registered: ${route.method.toUpperCase()} ${route.path}`);
  }

  send<T>(res: Response, statusCode: number, data: T): void {
    const modifiedData = this.pathTransformer.execute(data as Record<string, string>);
    res.type('application/json')
      .status(statusCode)
      .json(modifiedData);
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
