import {inject, injectable} from 'inversify';
import {Component} from '../../types';
import {UserService} from './user-service.interface.js';
import {UserEntity} from './user.entity.js';
import {DocumentType, types} from '@typegoose/typegoose';
import {CreateUserDTO} from './dto';
import {Logger} from '../../libs/logger';


@injectable()
export class DefaultUserService implements UserService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.UserModel) private readonly userModel: types.ModelType<UserEntity>
  ) {
  }

  public async create(dto: CreateUserDTO, salt: string): Promise<DocumentType<UserEntity>> {
    const user = new UserEntity(dto);
    user.setPassword(dto.password, salt);

    const result = await this.userModel.create(user);
    this.logger.info(`New user created: ${user.email}`);

    return result;
  }

  public async findByEmail(email: string): Promise<DocumentType<UserEntity> | null> {
    return await this.userModel.findOne({email}).exec();
  }

  public async findById(id: string): Promise<DocumentType<UserEntity> | null> {
    return await this.userModel.findById({id}).exec();
  }

  public async findOrCreate(dto: CreateUserDTO, salt: string): Promise<DocumentType<UserEntity>> {
    const existedUser = await this.findByEmail(dto.email);

    if (existedUser) {
      return existedUser;
    }

    return await this.create(dto, salt);
  }
}
