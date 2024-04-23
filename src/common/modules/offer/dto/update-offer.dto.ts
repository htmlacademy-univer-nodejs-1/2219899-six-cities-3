import {AccommodationType} from '../../../types';
import {Location} from '../../../types/location.type.js';

export class UpdateOfferDTO {
  public title?: string;
  public description?: string;
  public publishedAt?: string;
  public city?: string;
  public previewImage!: string;
  public images?: string[];
  public isPremium?: boolean;
  public isFavourite?: boolean;
  public rating?: number;
  public type?: AccommodationType;
  public bedrooms?: number;
  public maxAdults?: number;
  public price?: number;
  public goods?: string[];
  public location?: Location;
  public userId?: string;
}
