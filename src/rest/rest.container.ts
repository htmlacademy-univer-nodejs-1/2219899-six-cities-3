import {Container} from 'inversify';
import {RestApplication} from './rest.app.js';
import {Component} from '../common/types/index.js';
import {DatabaseClient, MongoClient} from '../common/libs/database_client/index.js';
import {Logger, PinoLogger} from '../common/libs/logger/index.js';
import {Config, RestConfig, RestSchema} from '../common/libs/config/index.js';
import {
  AppExceptionFilter,
  ExceptionFilter,
  HttpErrorExceptionFilter,
  ValidationExceptionFilter,
  PathTransformer
} from '../common/libs/rest/index.js';


export function createRestApplicationContainer(): Container {
  const restApplicationContainer = new Container();

  restApplicationContainer.bind<RestApplication>(Component.RestApplication).to(RestApplication).inSingletonScope();
  restApplicationContainer.bind<Logger>(Component.Logger).to(PinoLogger).inSingletonScope();
  restApplicationContainer.bind<Config<RestSchema>>(Component.Config).to(RestConfig).inSingletonScope();
  restApplicationContainer.bind<DatabaseClient>(Component.DatabaseClient).to(MongoClient).inSingletonScope();
  restApplicationContainer.bind<ExceptionFilter>(Component.ExceptionFilter).to(AppExceptionFilter).inSingletonScope();
  restApplicationContainer.bind<ExceptionFilter>(Component.HttpExceptionFilter).to(HttpErrorExceptionFilter);
  restApplicationContainer.bind<ExceptionFilter>(Component.ValidationExceptionFilter).to(ValidationExceptionFilter).inSingletonScope();
  restApplicationContainer.bind<PathTransformer>(Component.PathTransformer).to(PathTransformer).inSingletonScope();
  return restApplicationContainer;
}
