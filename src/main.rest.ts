import 'reflect-metadata';
import {RestApplication} from './rest';
import {Component} from './common/types';
import {createRestApplicationContainer} from './rest/rest.container';
import {Container} from 'inversify';
import {createUserContainer} from './common/modules/user';

async function main() {
  const container = Container.merge(
    createRestApplicationContainer(),
    createUserContainer(),
  );
  const application = container.get<RestApplication>(Component.RestApplication);
  await application.init();
}

await main();
