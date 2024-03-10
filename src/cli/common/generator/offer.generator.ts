import {TypeGenerator} from './generator.interface';
import {ServerMockData} from '../types/server_mock_data.type';
import {Random} from '../utils/random.util';
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
      Random.getRandomArrayItem<string>(this.data.names),
      Random.getRandomArrayItem<string>(this.data.descriptions),
      this.randomISODate(),
      Random.getRandomArrayItem<string>(this.data.cities),
      Random.getRandomArrayItem<string>(this.data.previews),
      Random.getRandomItems<string>(this.data.photos),
      Random.getRandomArrayItem<boolean>(this.data.premium),
      Random.getRandomArrayItem<boolean>(this.data.favourite),
      Random.getRandomArrayItem<string>(this.data.types),
      Random.getRandomFloat(this.data.rating),
      Random.getRandomInteger(this.data.room_count),
      Random.getRandomInteger(this.data.guest_count),
      Random.getRandomItems<string>(this.data.conveniences),
      Random.getRandomInteger(this.data.cost),
      Random.getRandomArrayItem<string>(this.data.users),
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
