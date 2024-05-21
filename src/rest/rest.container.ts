import {Container} from 'inversify';
import {RestApplication} from './rest.app.js';
import {Component} from '../common/types/index.js';
import {DatabaseClient, MongoClient} from '../common/libs/database_client/index.js';
import {Logger, PinoLogger} from '../common/libs/logger/index.js';
import {Config, RestConfig, RestSchema} from '../common/libs/config/index.js';
import {AppExceptionFilter, ExceptionFilter} from '../common/libs/rest/index.js';


export function createRestApplicationContainer(): Container {
  const restApplicationContainer = new Container();

  restApplicationContainer.bind<RestApplication>(Component.RestApplication).to(RestApplication).inSingletonScope();
  restApplicationContainer.bind<Logger>(Component.Logger).to(PinoLogger).inSingletonScope();
  restApplicationContainer.bind<Config<RestSchema>>(Component.Config).to(RestConfig).inSingletonScope();
  restApplicationContainer.bind<DatabaseClient>(Component.DatabaseClient).to(MongoClient).inSingletonScope();
  restApplicationContainer.bind<ExceptionFilter>(Component.ExceptionFilter).to(AppExceptionFilter).inSingletonScope();

  return restApplicationContainer;
}
