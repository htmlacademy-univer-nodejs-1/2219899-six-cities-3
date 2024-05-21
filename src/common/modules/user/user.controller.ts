import {CreateUserDTO, LoginDTO} from './dto/index.js';
import {Request, Response} from 'express';
import {inject, injectable} from 'inversify';
import {Component} from '../../types/index.js';
import {UserService} from './user-service.interface.js';
import {StatusCodes} from 'http-status-codes';
import {schemaValidate} from '../../utils/index.js';
import {UserRDO} from './rdo/index.js';
import {
  BaseController,
  HTTPException,
  HttpMethod,
  RequestBody,
  RequestParams,
  UploadFileMiddleware,
  ValidateDTOMiddleware,
  ValidateObjectIDMiddleware
} from '../../libs/rest/index.js';
import {Logger} from '../../libs/logger/index.js';
import {Config, RestSchema} from '../../libs/config/index.js';

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
      middlewares: [
        new ValidateObjectIDMiddleware('userId'),
        new UploadFileMiddleware(this.config.get('UPLOAD_DIRECTORY'), 'avatar'),
      ],
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
    this.created(_res, {filepath: _req.file?.path});
  }
}
