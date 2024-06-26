import {Expose} from 'class-transformer';

export class UserRDO {
  @Expose()
  public id: string;

  @Expose()
  public name: string;

  @Expose()
  public avatarUrl: string;

  @Expose()
  public type: string;

  @Expose()
  public email: string;
}
