import {TypeGenerator} from './generator.interface';
import {ServerMockData} from '../types';
import {Random} from '../utils';
import dayjs from 'dayjs';

export class OfferGenerator implements TypeGenerator {
  private readonly FIRST_WEEK_DAY = 1;
  private readonly LAST_WEEK_DAY = 7;

  private readonly data: ServerMockData;

  public constructor(data: ServerMockData) {
    this.data = data;
  }

  generate(): string {
    return [
      Random.getRandomArrayItem<string>(this.data.titles),
      Random.getRandomArrayItem<string>(this.data.descriptions),
      this.randomISODate(),
      Random.getRandomArrayItem<string>(this.data.cities),
      Random.getRandomArrayItem<string>(this.data.previewImages),
      Random.getRandomItems<string>(this.data.images),
      Random.getRandomArrayItem<boolean>(this.data.premium),
      Random.getRandomArrayItem<boolean>(this.data.favourite),
      Random.getRandomFloat(this.data.rating),
      Random.getRandomArrayItem<string>(this.data.types),
      Random.getRandomInteger(this.data.bedrooms),
      Random.getRandomInteger(this.data.adults),
      Random.getRandomInteger(this.data.price),
      Random.getRandomItems<string>(this.data.goods),
      Random.getRandomArrayItem<string>(this.data.userNames),
      Random.getRandomArrayItem<string>(this.data.userEmails),
      Random.getRandomArrayItem<string>(this.data.userAvatars),
      Random.getRandomInteger(this.data.commentsCount),
      Random.getRandomArrayItem(this.data.coordinates)
    ].join('\t');
  }

  private randomISODate(): string {
    return dayjs()
      .subtract(
        Random.getRandomInteger({min: this.FIRST_WEEK_DAY, max: this.LAST_WEEK_DAY}),
        'day'
      )
      .toISOString();
  }
}
