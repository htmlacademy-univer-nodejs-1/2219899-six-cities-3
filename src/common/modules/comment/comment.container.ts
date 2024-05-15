import {Container} from 'inversify';
import {CommentService} from './comment-service.interface.js';
import {Component} from '../../types/index.js';
import {DefaultCommentService} from './comment.service.js';
import {types} from '@typegoose/typegoose';
import {CommentEntity, CommentModel} from './comment.entity.js';
import {Controller} from '../../libs/rest/index.js';
import {CommentController} from './comment.controller.js';

export function commentContainer() {
  const container = new Container();

  container
    .bind<CommentService>(Component.CommentService)
    .to(DefaultCommentService)
    .inSingletonScope();

  container
    .bind<types.ModelType<CommentEntity>>(Component.CommentModel)
    .toConstantValue(CommentModel);

  container
    .bind<Controller>(Component.CommentController)
    .to(CommentController)
    .inSingletonScope();

  return container;
}
