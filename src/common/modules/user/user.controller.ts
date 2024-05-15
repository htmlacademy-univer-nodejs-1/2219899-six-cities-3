import {CreateUserDTO, LoginDTO} from './dto';
import {Request, Response} from 'express';
import {inject, injectable} from 'inversify';
import {Component} from '../../types';
import {UserService} from './user-service.interface.js';
import {StatusCodes} from 'http-status-codes';
import {schemaValidate} from '../../utils';
import {UserRDO} from './rdo';
import {
  BaseController,
  HTTPException,
  HttpMethod,
  RequestBody,
  RequestParams, ValidateObjectIDMiddleware
} from '../../libs/rest';
import {Logger} from '../../libs/logger';
import {Config, RestSchema} from '../../libs/config';
import {ValidateDTOMiddleware} from '../../libs/rest';

type CreateUserRequest = Request<RequestParams, RequestBody, CreateUserDTO>;
type LoginRequest = Request<RequestParams, RequestBody, LoginDTO>

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.UserService) protected readonly userService: UserService,
    @inject(Component.Config) private readonly config: Config<RestSchema>
  ) {
    super(logger);

    this.addRoute({
      handler: this.register,
      method: HttpMethod.POST,
      middlewares: [new ValidateDTOMiddleware(CreateUserDTO)],
      path: '/register'
    });
    this.addRoute({
      handler: this.isUserAuthenticated,
      method: HttpMethod.GET,
      path: '/login',
      middlewares: [new ValidateDTOMiddleware(LoginDTO)]
    });
    this.addRoute({handler: this.login, method: HttpMethod.POST, path: '/login'});
    this.addRoute({handler: this.logout, method: HttpMethod.DELETE, path: '/logout'});
    this.addRoute({
      handler: this.uploadAvatar,
      method: HttpMethod.POST,
      middlewares: [new ValidateObjectIDMiddleware('userId')],
      path: '/:userId/avatar'
    });
  }

  public async register({body}: CreateUserRequest, res: Response): Promise<void> {
    const userExists = await this.userService.findByEmail(body.email);
    if (userExists) {
      throw new HTTPException(StatusCodes.CONFLICT, `User with email = ${body.email} already exists`);
    }
    const userCreated = await this.userService.create(body, this.config.get('SALT'));
    const responseData = schemaValidate(UserRDO, userCreated);
    this.created(res, responseData);
  }

  public async login(
    {body}: LoginRequest,
    _res: Response
  ): Promise<void> {
    const userExists = await this.userService.findByEmail(body.email);
    if (userExists) {
      throw new HTTPException(StatusCodes.UNAUTHORIZED, 'Incorrect email or password');
    }
    this.notImplemented(_res,);
  }

  public async isUserAuthenticated(): Promise<void> {
    throw new HTTPException(StatusCodes.NOT_IMPLEMENTED, 'Not implemented');
  }

  public async logout(): Promise<void> {
    throw new HTTPException(StatusCodes.NOT_IMPLEMENTED, 'Not implemented');
  }

  public async uploadAvatar(_req: Request, _res: Response): Promise<void> {
    throw new HTTPException(StatusCodes.NOT_IMPLEMENTED, 'Not implemented');
  }
}
