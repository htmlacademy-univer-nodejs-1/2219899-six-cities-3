import {Container} from 'inversify';
import {CommentService} from './comment-service.interface';
import {Component} from '../../types';
import {DefaultCommentService} from './comment.service';
import {types} from '@typegoose/typegoose';
import {CommentEntity, CommentModel} from './comment.entity';

export function commentContainer() {
  const container = new Container();

  container
    .bind<CommentService>(Component.CommentService)
    .to(DefaultCommentService)
    .inSingletonScope();

  container
    .bind<types.ModelType<CommentEntity>>(Component.CommentModel)
    .toConstantValue(CommentModel);

  return container;
}
