import {User} from './user.type';
import {AccommodationType} from './accommodation.enum';
import {ConveniencesEnum} from './conveniences.enum';
import {Location} from './location.type';

export type RentOffer = {
  title: string,
  description: string
  publishedAt: Date;
  city: string,
  previewImage: string,
  images: string[],
  isPremium: boolean,
  isFavourite: boolean,
  rating: number,
  type: AccommodationType,
  bedrooms: number,
  maxAdults: number,
  price: number,
  goods: ConveniencesEnum[],
  user: User,
  commentsCount: number,
  location: Location,
};
