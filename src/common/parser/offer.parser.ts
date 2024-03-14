import {ParserInterface} from './parser.interface';
import {RentOffer} from '../types/offer.type';
import {AccommodationType} from '../types/accommodation.enum';
import {ConveniencesEnum} from '../types/conveniences.enum';

export class RentOfferParser implements ParserInterface<RentOffer> {
  public parse(rawString: string): RentOffer {
    if (rawString === undefined || rawString.trim().length <= 1) {
      throw new Error('rawString must be in correct format, not null or too short');
    }
    const [
      name, description, publishedAt, city, preview, photos, isPremium, isFavourite, rating,
      accommodationType, roomCount, guestCount, cost, conveniences, userName, userEmail,
      userAvatar, commentsCount, latitude, longitude
    ]: string[] = rawString.split('\t');
    return {
      name,
      description,
      publishedAt: new Date(publishedAt),
      city,
      preview,
      photos: photos.split(';'),
      isPremium: Boolean(isPremium),
      isFavourite: Boolean(isFavourite),
      rating: Number(rating),
      accommodationType: accommodationType as AccommodationType,
      roomCount: Number(roomCount),
      guestCount: Number(guestCount),
      cost: Number(cost),
      conveniences: conveniences.split(';') as ConveniencesEnum[],
      user: {name: userName, email: userEmail, avatar: userAvatar},
      commentsCount: Number(commentsCount),
      latitude: Number(latitude),
      longitude: Number(longitude)
    };
  }
}

