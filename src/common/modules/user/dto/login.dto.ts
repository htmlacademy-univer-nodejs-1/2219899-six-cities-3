import {IsEmail, IsString, Length} from 'class-validator';
import {CreateLoginUserMessage} from './login-user.messages.js';
import {CreateUserMessages} from './create-user.messages.js';

export class LoginDTO {
  @IsEmail({}, {message: CreateLoginUserMessage.email.invalidFormat})
  public email: string;

  @IsString({message: CreateLoginUserMessage.password.invalidFormat})
  @Length(6, 12, {message: CreateUserMessages.password.lengthField})
  public password: string;
}
