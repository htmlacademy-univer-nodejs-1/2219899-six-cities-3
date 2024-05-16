import {TypeGenerator} from './generator.interface.js';
import {ServerMockData, UserType} from '../../types/index.js';
import {Random} from '../../utils/index.js';

export class OfferGenerator implements TypeGenerator {

  private readonly data: ServerMockData;

  public constructor(data: ServerMockData) {
    this.data = data;
  }

  generate(): string {
    return [
      Random.getRandomArrayItem<string>(this.data.titles),
      Random.getRandomArrayItem<string>(this.data.descriptions),
      Random.getRandomArrayItem<string>(this.data.cities),
      Random.getRandomArrayItem<string>(this.data.previewImages),
      Random.getRandomItems<string>(this.data.images),
      Random.getRandomArrayItem<boolean>(this.data.premium),
      Random.getRandomArrayItem<boolean>(this.data.favourite),
      Random.getRandomArrayItem<string>(this.data.types),
      Random.getRandomInteger(this.data.bedrooms),
      Random.getRandomInteger(this.data.adults),
      Random.getRandomInteger(this.data.price),
      Random.getRandomItems<string>(this.data.goods),
      Random.getRandomArrayItem<string>(this.data.userNames),
      Random.getRandomArrayItem<string>(this.data.userEmails),
      Random.getRandomArrayItem<string>(this.data.userAvatars),
      Random.getRandomArrayItem<UserType>([UserType.Ordinary, UserType.Pro]),
      Random.getRandomArrayItem(this.data.coordinates)
    ].join('\t');
  }
}
