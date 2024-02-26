import {ParserInterface} from './parser.interface';
import {RentOffer} from '../types/offer.type';
import {AccommodationType} from '../types/accommodation.enum';
import {ConveniencesEnum} from '../types/conveniences.enum';

export class RentOfferParser implements ParserInterface<RentOffer> {
  public* parse(rawData: string): Generator<RentOffer> {
    for (const row of rawData.split('\n').slice(1)) {
      if (row.trim().length <= 1) {
        continue;
      }
      const [
        name, description, publishedAt, city, preview, photos, isPremium, isFavourite, rating,
        accommodationType, roomCount, guestCount, cost, conveniences, userName, userEmail,
        userAvatar, commentsCount, latitude, longitude
      ]: string[] = row.split('\t');
      yield {
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
}

