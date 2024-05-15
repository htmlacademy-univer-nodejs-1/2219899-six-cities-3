import {Container} from 'inversify';
import {RestApplication} from './rest.app.js';
import {Component} from '../common/types/index.js';
import {Config} from 'convict';
import {DatabaseClient, MongoClient} from '../common/libs/database_client/index.js';
import {Logger, PinoLogger} from '../common/libs/logger/index.js';
import {RestConfig, RestSchema} from '../common/libs/config/index.js';


export function createRestApplicationContainer(): Container {
  const restApplicationContainer = new Container();

  restApplicationContainer.bind<RestApplication>(Component.RestApplication).to(RestApplication).inSingletonScope();
  restApplicationContainer.bind<Logger>(Component.Logger).to(PinoLogger).inSingletonScope();
  restApplicationContainer.bind<Config<RestSchema>>(Component.Config).to(RestConfig).inSingletonScope();
  restApplicationContainer.bind<DatabaseClient>(Component.DatabaseClient).to(MongoClient).inSingletonScope();

  return restApplicationContainer;
}
