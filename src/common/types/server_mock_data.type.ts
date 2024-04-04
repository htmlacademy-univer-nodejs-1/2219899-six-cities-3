import {Limit} from './limit.type';

export type ServerMockData = {
  titles: string[];
  descriptions: string[];
  cities: string[];
  previewImages: string[];
  images: string[];
  premium: boolean[];
  favourite: boolean[];
  rating: Limit;
  types: string[];
  bedrooms: Limit;
  adults: Limit;
  price: Limit;
  goods: string[];
  userNames: string[];
  userEmails: string[];
  userAvatars: string[];
  commentsCount: Limit;
  coordinates: string[];
};
