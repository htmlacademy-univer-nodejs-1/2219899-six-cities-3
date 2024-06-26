import {CreateUserDTO, LoginDTO} from './dto/index.js';
import {Request, Response} from 'express';
import {inject, injectable} from 'inversify';
import {Component} from '../../types/index.js';
import {UserService} from './user-service.interface.js';
import {StatusCodes} from 'http-status-codes';
import {schemaValidate} from '../../utils/index.js';
import {LoggedUserRdo, UploadUserAvatarRdo, UserRDO} from './rdo/index.js';
import {
  BaseController,
  HTTPException,
  HttpMethod,
  PrivateRouteMiddleware,
  RequestBody,
  RequestParams,
  UploadFileMiddleware,
  ValidateDTOMiddleware,
  ValidateObjectIDMiddleware
} from '../../libs/rest/index.js';
import {Logger} from '../../libs/logger/index.js';
import {Config, RestSchema} from '../../libs/config/index.js';
import {AuthService} from '../auth/index.js';

type CreateUserRequest = Request<RequestParams, RequestBody, CreateUserDTO>;
type LoginRequest = Request<RequestParams, RequestBody, LoginDTO>

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.UserService) protected readonly userService: UserService,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
    @inject(Component.AuthService) private readonly authService: AuthService,
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
    });
    this.addRoute({
      handler: this.login,
      method: HttpMethod.POST,
      path: '/login',
      middlewares: [new ValidateDTOMiddleware(LoginDTO)]
    });
    this.addRoute({
      handler: this.logout,
      method: HttpMethod.DELETE,
      path: '/logout',
      middlewares: [new PrivateRouteMiddleware()]
    });
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

  public async login({body}: LoginRequest, res: Response): Promise<void> {
    const user = await this.authService.verify(body);
    const token = await this.authService.authenticate(user);
    const responseData = schemaValidate(
      LoggedUserRdo,
      {email: user.email, token: token}
    );
    this.ok(res, responseData);
  }

  public async isUserAuthenticated({tokenPayload}: Request, res: Response): Promise<void> {
    if (!tokenPayload) {
      throw new HTTPException(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized'
      );
    }
    const user = await this.userService.findByEmail(tokenPayload.email);
    if (!user) {
      throw new HTTPException(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized'
      );
    }
    this.ok(res, schemaValidate(LoggedUserRdo, user));
  }

  public async logout(_req: Request, _res: Response): Promise<void> {
    this.ok(_res, 'Logged out');
  }

  public async uploadAvatar({params, file}: Request, _res: Response): Promise<void> {
    if (!file) {
      throw new HTTPException(StatusCodes.BAD_REQUEST, 'No avatar to set');
    }
    const {userId} = params;
    const uploadFile = {avatarUrl: file.filename};
    await this.userService.updateByID(userId, uploadFile);
    this.created(_res, schemaValidate(UploadUserAvatarRdo, {filepath: uploadFile.avatarUrl}));
  }
}
