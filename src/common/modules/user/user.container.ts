import {Container} from 'inversify';
import {UserService} from './user-service.interface';
import {Component} from '../../types';
import {DefaultUserService} from './default-user.service';
import {types} from '@typegoose/typegoose';
import {UserEntity, UserModel} from './user.entity';

export function createUserContainer() {
  const container = new Container();
  container.bind<UserService>(Component.UserService).to(DefaultUserService).inSingletonScope();
  container.bind<types.ModelType<UserEntity>>(Component.UserModel).toConstantValue(UserModel);
  return container;
}
