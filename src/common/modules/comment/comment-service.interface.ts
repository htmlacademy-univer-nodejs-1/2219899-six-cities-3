import {DocumentType} from '@typegoose/typegoose';
import {CommentEntity} from './comment.entity';
import {CreateCommentDTO} from './dto';

export interface CommentService {
  create(commentSchema: CreateCommentDTO): Promise<DocumentType<CommentEntity>>;

  getCommentByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[]>;
}
