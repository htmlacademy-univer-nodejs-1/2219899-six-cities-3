import {CreateUserDTO} from './dto/index.js';
import {DocumentType} from '@typegoose/typegoose';
import {UserEntity} from './user.entity.js';

export interface UserService {
  create(dto: CreateUserDTO, salt: string): Promise<DocumentType<UserEntity>>;

  findByEmail(email: string): Promise<DocumentType<UserEntity> | null>;

  findById(id: string): Promise<DocumentType<UserEntity> | null>;

  findOrCreate(dto: CreateUserDTO, salt: string): Promise<DocumentType<UserEntity>>;
}
