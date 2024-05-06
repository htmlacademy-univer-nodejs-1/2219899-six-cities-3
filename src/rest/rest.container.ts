import {Container} from 'inversify';
import {RestApplication} from './rest.app.js';
import {Component} from '../common/types';
import {Config} from 'convict';
import {DatabaseClient, MongoClient} from '../common/libs/database_client';
import {Logger} from '../common/libs/logger';


export function createRestApplicationContainer(): Container {
  const restApplicationContainer = new Container();

  restApplicationContainer.bind<RestApplication>(Component.RestApplication).to(RestApplication).inSingletonScope();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  restApplicationContainer.bind<Logger>(Component.Logger).to(PinoLogger).inSingletonScope();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  restApplicationContainer.bind<Config<RestSchema>>(Component.Config).to(RestConfig).inSingletonScope();
  restApplicationContainer.bind<DatabaseClient>(Component.DatabaseClient).to(MongoClient).inSingletonScope();

  return restApplicationContainer;
}
