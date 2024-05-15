import {DocumentType, types} from '@typegoose/typegoose';
import {CommentService} from './comment-service.interface.js';
import {CommentEntity} from './comment.entity.js';
import {CreateCommentDTO} from './dto/index.js';
import {inject, injectable} from 'inversify';
import {Component} from '../../types/index.js';
import {Logger} from '../../libs/logger/index.js';

@injectable()
export class DefaultCommentService implements CommentService {
  public constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>
  ) {
  }

  async create(dto: CreateCommentDTO): Promise<DocumentType<CommentEntity>> {
    const comment = await this.commentModel.create(dto);
    this.logger.info(`Comment ${comment.comment} is created`);
    return comment.populate(['userId', 'offerId']);

  }

  async getCommentsByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[]> {
    return this.commentModel
      .find({offerId: offerId})
      .populate(['userId', 'offerId']);
  }

  async deleteByOfferId(offerId: string): Promise<number> {
    const result = await this.commentModel
      .deleteMany({offerId})
      .exec();

    return result.deletedCount;
  }
}
