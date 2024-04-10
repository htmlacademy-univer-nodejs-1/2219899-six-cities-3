import {AccommodationType, ConveniencesEnum, RentOffer} from '../types';
import {Location} from '../types/location.type';

export function parseOffer(rawString: string): RentOffer {
  if (rawString === undefined || rawString.trim().length <= 1) {
    throw new Error('rawString must be in correct format, not null or too short');
  }
  const [
    title,
    description,
    publishedAt,
    city,
    previewImage,
    images,
    isPremium,
    isFavourite,
    rating,
    type,
    bedrooms,
    maxAdults,
    price,
    goods,
    userName,
    userEmail,
    userAvatar,
    commentsCount,
    location
  ]: string[] = rawString.split('\t');
  return {
    title: title,
    description: description,
    publishedAt: new Date(publishedAt),
    city,
    previewImage: previewImage,
    images: images.split(','),
    isPremium: Boolean(isPremium),
    isFavourite: Boolean(isFavourite),
    rating: Number(rating),
    type: type as AccommodationType,
    bedrooms: Number(bedrooms),
    maxAdults: Number(maxAdults),
    price: Number(price),
    goods: goods.split(',') as ConveniencesEnum[],
    user: {name: userName, email: userEmail, avatar: userAvatar},
    commentsCount: Number(commentsCount),
    location: parseLocation(location)
  };
}

function parseLocation(location: string): Location {
  const [latitude, longitude] = location.split(';');
  return {latitude: Number(latitude), longitude: Number(longitude)};
}
