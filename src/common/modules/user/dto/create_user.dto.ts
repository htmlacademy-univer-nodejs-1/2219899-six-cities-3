import {UserType} from '../../../types/index.js';
import {IsEmail, IsEnum, IsString, Length} from 'class-validator';
import {CreateUserMessages} from './create-user.messages.js';

export class CreateUserDTO {
  @IsEmail({}, {message: CreateUserMessages.email.invalidFormat})
  public email: string;

  @Length(1, 15, {message: CreateUserMessages.name.lengthField})
  public name: string;

  @IsString({message: CreateUserMessages.password.invalidFormat})
  @Length(6, 12, {message: CreateUserMessages.password.lengthField})
  public password: string;

  @IsEnum(UserType, {message: CreateUserMessages.type.invalid})
  public type: UserType;
}
