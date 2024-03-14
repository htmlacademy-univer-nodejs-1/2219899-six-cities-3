import {User} from './user.type';
import {AccommodationType} from './accommodation.enum';
import {ConveniencesEnum} from './conveniences.enum';

export type RentOffer = {
  name: string,
  description: string
  publishedAt: Date;
  city: string,
  preview: string,
  photos: string[],
  isPremium: boolean,
  isFavourite: boolean,
  rating: number,
  accommodationType: AccommodationType,
  roomCount: number,
  guestCount: number,
  cost: number,
  conveniences: ConveniencesEnum[],
  user: User,
  commentsCount: number,
  latitude: number,
  longitude: number
};
