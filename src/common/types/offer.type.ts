import {User} from './user.type.js';
import {AccommodationType} from './accommodation.enum.js';
import {ConveniencesEnum} from './conveniences.enum.js';
import {Location} from './location.type.js';
import {City} from './city.enum.js';

export type RentOffer = {
  title: string,
  description: string,
  city: City,
  previewImage: string,
  images: string[],
  isPremium: boolean,
  isFavourite: boolean,
  type: AccommodationType,
  bedrooms: number,
  maxAdults: number,
  price: number,
  goods: ConveniencesEnum[],
  user: User,
  location: Location,
};
