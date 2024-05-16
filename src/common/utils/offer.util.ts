import {AccommodationType, City, ConveniencesEnum, Location, RentOffer, UserType,} from '../types/index.js';

export function parseOffer(rawString: string): RentOffer {
  if (rawString === undefined || rawString.trim().length <= 1) {
    throw new Error('rawString must be in correct format, not null or too short');
  }
  const [
    title,
    description,
    city,
    previewImage,
    images,
    isPremium,
    isFavourite,
    type,
    bedrooms,
    maxAdults,
    price,
    goods,
    userName,
    userEmail,
    userAvatar,
    userType,
    location
  ]: string[] = rawString.split('\t');
  return {
    title: title,
    description: description,
    city: city as City,
    previewImage: previewImage,
    images: images.split(','),
    isPremium: Boolean(isPremium),
    isFavourite: Boolean(isFavourite),
    type: type as AccommodationType,
    bedrooms: Number(bedrooms),
    maxAdults: Number(maxAdults),
    price: Number(price),
    goods: goods.split(',') as ConveniencesEnum[],
    user: {name: userName, email: userEmail, avatarUrl: userAvatar, type: userType as UserType},
    location: parseLocation(location)
  };
}

function parseLocation(location: string): Location {
  const [latitude, longitude] = location.split(';');
  return {latitude: Number(latitude), longitude: Number(longitude)};
}
