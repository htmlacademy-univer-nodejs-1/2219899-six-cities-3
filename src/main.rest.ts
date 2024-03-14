import 'reflect-metadata';
import {Container} from 'inversify';
import {Logger, PinoLogger} from './common/logger';
import {RestApplication} from './rest';
import {RestConfig, RestSchema} from './common/config';
import {Component} from './common/types';
import {Config} from 'convict';

async function main() {
  const container = new Container();
  container.bind<RestApplication>(Component.RestApplication).to(RestApplication).inSingletonScope();
  container.bind<Logger>(Component.Logger).to(PinoLogger).inSingletonScope();
  container.bind<Config<RestSchema>>(Component.Config).to(RestConfig).inSingletonScope();

  const application = container.get<RestApplication>(Component.RestApplication);
  await application.init();
}

await main();
