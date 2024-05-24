import {LoginDTO, UserEntity} from '../user/index.js';


export interface AuthService {
  authenticate(user: UserEntity): Promise<string>;

  verify(dto: LoginDTO): Promise<UserEntity>;
}
