import 'reflect-metadata';
import {RestApplication} from './rest';
import {Component} from './common/types';
import {createRestApplicationContainer} from './rest/rest.container.js';
import {Container} from 'inversify';
import {createUserContainer} from './common/modules/user';
import {createOfferContainer} from './common/modules/offer';
import {commentContainer} from './common/modules/comment';

async function main() {
  const container = Container.merge(
    createRestApplicationContainer(),
    createUserContainer(),
    createOfferContainer(),
    commentContainer(),
  );
  const application = container.get<RestApplication>(Component.RestApplication);
  await application.init();
}

await main();
