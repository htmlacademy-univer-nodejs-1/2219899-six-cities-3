import {Expose, Type} from 'class-transformer';
import {UserRDO} from '../../user';

export class OfferRDO {
  @Expose()
  public id!: string;

  @Expose()
  public title!: string;

  @Expose()
  public description!: string;

  @Expose()
  public city!: string;

  @Expose()
  public previewImage!: string;

  @Expose()
  public images!: string;

  @Expose()
  public isPremium!: string;

  @Expose()
  public isFavourite!: string;

  @Expose()
  public rating!: string;

  @Expose()
  public type!: string;

  @Expose()
  public bedrooms!: string;

  @Expose()
  public maxAdults!: string;

  @Expose()
  public price!: string;

  @Expose()
  public goods!: string;

  @Expose()
  @Type(() => UserRDO)
  public host!: string;

  @Expose()
  public location!: string;
}
