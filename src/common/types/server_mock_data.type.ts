import {Limit} from './limit.type';

export type ServerMockData = {
  names: string[];
  descriptions: string[];
  cities: string[];
  previews: string[];
  photos: string[];
  premium: boolean[];
  favourite: boolean[];
  types: string[];
  rating: Limit;
  room_count: Limit;
  guest_count: Limit;
  conveniences: string[];
  cost: Limit;
  users: string[];
  commentsCount: Limit;
  coordinates: string[];
};
