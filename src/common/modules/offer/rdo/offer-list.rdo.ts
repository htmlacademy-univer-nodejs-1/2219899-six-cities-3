import {Expose} from 'class-transformer';
import {City, AccommodationType} from '../../../types/index.js';

export class OfferListRdo {
  @Expose()
  public id!: string;

  @Expose()
  public title!: string;

  @Expose()
  public city!: City;

  @Expose()
  public previewImage!: string;

  @Expose()
  public isPremium!: boolean;

  @Expose()
  public isFavourites!: boolean;

  @Expose()
  public createdAt!: string;

  @Expose()
  public type!: AccommodationType;

  @Expose()
  public price!: number;

  @Expose()
  public rating!: number;

  @Expose()
  public commentsCount!: number;
}
