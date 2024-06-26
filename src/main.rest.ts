import 'reflect-metadata';
import {RestApplication} from './rest/index.js';
import {Component} from './common/types/index.js';
import {createRestApplicationContainer} from './rest/index.js';
import {Container} from 'inversify';
import {createUserContainer} from './common/modules/user/index.js';
import {createOfferContainer} from './common/modules/offer/index.js';
import {commentContainer} from './common/modules/comment/index.js';
import {createAuthContainer} from './common/modules/auth/index.js';

async function main() {
  const container = Container.merge(
    createRestApplicationContainer(),
    createUserContainer(),
    createOfferContainer(),
    commentContainer(),
    createAuthContainer(),
  );
  const application = container.get<RestApplication>(Component.RestApplication);
  await application.init();
}

await main();
