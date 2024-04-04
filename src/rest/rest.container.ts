import {Container} from 'inversify';
import {RestApplication} from './rest.app';
import {Component} from '../common/types';
import pino from 'pino';
import {Config} from 'convict';
import {RestConfig, RestSchema} from '../common/config';
import {DatabaseClient, MongoClient} from '../common/database_client';
import {PinoLogger} from '../common/logger';
import Logger = pino.Logger;


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
