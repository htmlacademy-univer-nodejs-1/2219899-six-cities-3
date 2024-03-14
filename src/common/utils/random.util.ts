import {Limit} from '../types/limit.type';

export class Random {
  public static getRandomInteger({min, max}: Limit): number {
    return Math.round(this.getRandomFloat({min, max}));
  }

  public static getRandomFloat({min, max}: Limit): number {
    return Math.random() * (max - min) + min;
  }

  public static getRandomArrayItem<T>(array: T[]): T {
    return array[this.getRandomInteger({min: 0, max: array.length - 1})];
  }

  public static getRandomItems<T>(array: T[]): T[] {
    const result: T[] = [];
    for (let i = 0; i < this.getRandomInteger({min: 0, max: array.length - 1}); i++) {
      result.push(this.getRandomArrayItem(array));
    }
    return result;
  }
}
