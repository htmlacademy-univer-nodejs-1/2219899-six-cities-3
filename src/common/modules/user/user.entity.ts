import {User, UserType} from '../../types/index.js';
import {defaultClasses, getModelForClass, modelOptions, prop} from '@typegoose/typegoose';
import {createSha256} from '../../utils/index.js';

export interface UserEntity extends defaultClasses.Base {
}

@modelOptions({
  schemaOptions: {collection: 'users'}
})
export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({required: true, default: '', type: () => String})
  public name: string;

  @prop({required: true, unique: true, default: '', type: () => String})
  public email: string;

  @prop({required: false, default: '', type: () => String})
  public avatarUrl?: string;

  @prop({required: true, default: '', type: () => String})
  private password?: string;

  @prop({ required: true, type: () => String })
  public type: UserType;

  constructor(user: User) {
    super();
    this.name = user.name;
    this.email = user.email;
    this.avatarUrl = user.avatarUrl;
    this.type = user.type;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSha256(password, salt);
  }

  public getPassword() {
    return this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
