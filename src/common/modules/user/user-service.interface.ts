import {CreateUserDTO} from './dto';
import {DocumentType} from '@typegoose/typegoose';
import {UserEntity} from './user.entity';

export interface UserService {
  create(dto: CreateUserDTO, salt: string): Promise<DocumentType<UserEntity>>;

  findByEmail(email: string): Promise<DocumentType<UserEntity> | null>;

  findById(id: string): Promise<DocumentType<UserEntity> | null>;

  findOrCreate(dto: CreateUserDTO, salt: string): Promise<DocumentType<UserEntity>>;
}
