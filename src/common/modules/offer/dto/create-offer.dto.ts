import {Location} from '../../../types/location.type';
import {AccommodationType} from '../../../types';

export class CreateOfferDto {
  public title!: string;
  public description!: string;
  public city!: string;
  public previewImage!: string;
  public images!: string[];
  public isPremium!: boolean;
  public isFavourite!: boolean;
  public bedrooms!: number;
  public maxAdults!: number;
  public price!: number;
  public goods!: string[];
  public location!: Location;
  public type!: AccommodationType;
  public host!: string;
}
