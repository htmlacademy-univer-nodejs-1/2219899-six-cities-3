import {LoginDTO, UserService, UserEntity} from '../user/index.js';
import {AuthService} from './auth-service.interface.js';
import {inject, injectable} from 'inversify';
import {Component} from '../../types/index.js';
import {Config, RestSchema} from '../../libs/config/index.js';
import {Logger} from '../../libs/logger/index.js';
import * as crypto from 'node:crypto';
import {SignJWT} from 'jose';
import {JWT_ALGORITHM, JWT_EXPIRED} from './auth.constant.js';
import {TokenPayload} from './types/index.js';
import {UserNotFoundException, UserPasswordIncorrectException} from './errors/index.js';


@injectable()
export class DefaultAuthService implements AuthService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.UserService) private readonly userService: UserService,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
  ) {
  }

  async authenticate(user: UserEntity): Promise<string> {
    const jwtSecret = this.config.get('JWT_SECRET');
    const secretKey = crypto.createSecretKey(jwtSecret, 'utf-8');
    const tokenPayload: TokenPayload = {
      email: user.email,
      name: user.name,
      id: user.id,
    };
    this.logger.info(`Create token for ${user.email}`);
    return new SignJWT(tokenPayload)
      .setProtectedHeader({alg: JWT_ALGORITHM})
      .setIssuedAt()
      .setExpirationTime(JWT_EXPIRED)
      .sign(secretKey);
  }

  async verify(dto: LoginDTO): Promise<UserEntity> {
    const user = await this.userService.findByEmail(dto.email);
    if (!user) {
      this.logger.warning(`User with ${dto.email} not found`);
      throw new UserNotFoundException();
    }

    if (!user.verifyPassword(dto.password, this.config.get('SALT'))) {
      this.logger.warning(`Incorrect password for ${dto.email}`);
      throw new UserPasswordIncorrectException();
    }
    return user;
  }

}
