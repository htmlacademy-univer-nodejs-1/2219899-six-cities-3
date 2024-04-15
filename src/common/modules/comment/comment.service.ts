import {DocumentType, types} from '@typegoose/typegoose';
import {CommentService} from './comment-service.interface';
import {CommentEntity} from './comment.entity';
import {CreateCommentDTO} from './dto';
import {inject, injectable} from 'inversify';
import {Component} from '../../types';
import {Logger} from '../../logger';

@injectable()
export class DefaultCommentService implements CommentService {
  public constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>
  ) {
  }

  async create(commentSchema: CreateCommentDTO): Promise<DocumentType<CommentEntity>> {
    const comment = await this.commentModel.create(commentSchema);
    this.logger.info(`New comment created: ${comment.id}`);
    return comment.populate('userId');
  }

  async getCommentByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[]> {
    return this.commentModel
      .find({offerId: offerId})
      .populate('userId');
  }
}
