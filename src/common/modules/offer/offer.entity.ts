import {defaultClasses, getModelForClass, modelOptions, prop, Ref} from '@typegoose/typegoose';
import {
  AccommodationType,
  ConveniencesEnum,
  Location,
  RequestCity
} from '../../types/index.js';
import {UserEntity} from '../user/index.js';

export interface OfferEntity extends defaultClasses.Base {

}

@modelOptions({
  schemaOptions: {collection: 'offers'}
})
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({trim: true, required: true, minlength: 10, maxlength: 100, type: () => String})
  public title: string;

  @prop({trim: true,required: true, minlength: 20, maxlength: 1024, type: () => String})
  public description: string;

  @prop({required: true, type: () => Object})
  public city: RequestCity;

  @prop({required: true, type: () => String})
  public previewImage: string;

  @prop({required: true, type: () => Array<string>})
  public images: string[];

  @prop({required: true, type: () => Boolean})
  public isPremium: boolean;

  @prop({required: true, type: () => Boolean, default: false})
  public isFavourite: boolean;

  @prop({required: true, min: 1, max: 5, type: () => Number, default: 1})
  public rating: number;

  @prop({required: true, type: () => String, enum: AccommodationType})
  public type: AccommodationType;

  @prop({required: true, min: 1, max: 8, type: () => Number})
  public bedrooms: number;

  @prop({required: true, min: 1, max: 10, type: () => Number})
  public maxAdults: number;

  @prop({required: true, min: 100, max: 100_000, type: () => Number})
  public price: number;

  @prop({required: true, type: () => Array<ConveniencesEnum>})
  public goods: ConveniencesEnum[];

  @prop({required: true, default: 0, type: () => Number})
  public commentsCount: number;

  @prop({ref: UserEntity, required: true, type: () => String})
  public host: Ref<UserEntity>;

  @prop({required: true, type: () => Object})
  public location: Location;
}

export const OfferModel = getModelForClass(OfferEntity);

