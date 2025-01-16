import {
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { BlogUserEntity } from './blog-user.entity';
import { UserRole } from '@project/core';
import {BlogUserRepository} from "./blog-user.repository";
import {AUTH_USER_EXISTS} from "./blog-user.constant";
import {CreateUserDto} from "./dto/create-user.dto";

@Injectable()
export class BlogUserService {
  constructor(private readonly blogUserRepository: BlogUserRepository) {}

  public async register(dto: CreateUserDto): Promise<BlogUserEntity> {
    const { email, firstname, avatar, password } = dto;

    const existingUser = await this.blogUserRepository.findByEmail(email);
    if (existingUser) {
      throw new ConflictException(AUTH_USER_EXISTS);
    }

    const newUser = new BlogUserEntity({
      email,
      firstname,
      avatar,
      passwordHash: '',
      role: UserRole.User,
    });

    await newUser.setPassword(password);
    await this.blogUserRepository.save(newUser);

    return newUser;
  }
}
