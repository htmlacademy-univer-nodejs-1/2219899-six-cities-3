import {Limit} from '../types';

export class Random {
  public static getRandomInteger({min, max}: Limit): number {
    return Math.ceil(this.getRandomFloat({min, max}));
  }

  public static getRandomFloat({min, max}: Limit): number {
    return Math.random() * (max - min) + min;
  }

  public static getRandomArrayItem<T>(array: T[]): T {
    return array[this.getRandomInteger({min: 0, max: array.length - 1})];
  }

  public static getRandomItems<T>(array: T[]): T[] {
    const startPosition = this.getRandomInteger({min: 0, max: array.length - 1});
    const endPosition = startPosition + this.getRandomInteger({
      min: startPosition,
      max: array.length
    });
    return array.slice(startPosition, endPosition);
  }
}
