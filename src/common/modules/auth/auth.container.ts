import {Container} from 'inversify';
import {AuthService} from './auth-service.interface.js';
import {Component} from '../../types/index.js';
import {DefaultAuthService} from './default-auth.service.js';
import {AuthExceptionFilter} from '../../libs/rest/exception-filter/index.js';
import {ExceptionFilter} from '../../libs/rest/index.js';

export function createAuthContainer() {
  const authContainer = new Container();
  authContainer.bind<AuthService>(Component.AuthService).to(DefaultAuthService).inSingletonScope();
  authContainer.bind<ExceptionFilter>(Component.AuthExceptionFilter).to(AuthExceptionFilter).inSingletonScope();

  return authContainer;
}
