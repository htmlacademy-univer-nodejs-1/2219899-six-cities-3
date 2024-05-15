import {defaultClasses, getModelForClass, modelOptions, prop, Ref} from '@typegoose/typegoose';
import {UserEntity} from '../user';
import {OfferEntity} from '../offer';

export interface CommentEntity extends defaultClasses.Base {
}

@modelOptions({
  schemaOptions: {collection: 'comments'}
})
export class CommentEntity extends defaultClasses.TimeStamps {
  @prop({trim: true, required: true, type: () => String, minlength: 5, maxlength: 1024})
  public comment!: string;

  @prop({ref: OfferEntity, required: true, type: () => String})
  public offerId!: Ref<OfferEntity>;

  @prop({required: true, type: Number, min: 1, max: 5})
  public rating!: number;

  @prop({ref: UserEntity, required: true, type: () => String})
  public userId!: Ref<UserEntity>;
}

export const CommentModel = getModelForClass(CommentEntity);
