import {IsString} from 'class-validator';

export class UpdateUserDTO {
  @IsString({})
  public avatarUrl: string;
}
