import {ClassConstructor, plainToInstance} from 'class-transformer';

export function schemaValidate<T, V>(dto: ClassConstructor<T>, object: V) {
  return plainToInstance(dto, object, {excludeExtraneousValues: true});
}
