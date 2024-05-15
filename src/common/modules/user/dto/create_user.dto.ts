import {UserType} from '../../../types';
import {IsEmail, IsEnum, IsOptional, IsString, Length} from 'class-validator';
import {CreateUserMessages} from './create-user.messages.js';

export class CreateUserDTO {
  @IsString({message: CreateUserMessages.name.invalidFormat})
  @Length(1, 15, {message: CreateUserMessages.name.lengthField})
  public email!: string;

  @IsEmail({}, {message: CreateUserMessages.email.invalidFormat})
  public name!: string;

  @IsString({message: CreateUserMessages.password.invalidFormat})
  @Length(6, 12, {message: CreateUserMessages.password.lengthField})
  public password!: string;

  @IsEnum(UserType, {message: CreateUserMessages.type.invalid})
  public type!: UserType;

  @IsOptional()
  @IsString({message: CreateUserMessages.avatarUrl.invalidFormat})
  public avatarUrl!: string | undefined;
}
