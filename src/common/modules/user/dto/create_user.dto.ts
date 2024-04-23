import {UserType} from '../../../types/user-type.enum.js';

export class CreateUserDTO {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  public email: string;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  public name: string;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  public password: string;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  public type: UserType;
}
