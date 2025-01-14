import {ConflictException, Injectable, NotFoundException, UnauthorizedException} from "@nestjs/common";
import {BlogUserEntity, BlogUserRepository} from "@project/users-lib";
import {CreateUserDto} from "./dto/create-user.dto";
import {UserRole} from "@project/core";
import {AUTH_USER_EXISTS, AUTH_USER_NOT_FOUND, AUTH_USER_PASSWORD_WRONG} from "./auth.constant";
import {LoginUserDto} from "./dto/login-user.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly blogUserRepository: BlogUserRepository
  ) {
  }

  public async register(dto: CreateUserDto): Promise<BlogUserEntity> {
    const {email, firstname, avatar, password} = dto;

    const blogUser = {
      email,
      firstname,
      avatar,
      passwordHash: '',
      role: UserRole.User,
    };

    const existUser = await this.blogUserRepository.findByEmail(email);

    if (existUser) {
      throw new ConflictException(AUTH_USER_EXISTS);
    }

    const userEntity = await new BlogUserEntity(blogUser).setPassword(password);
    this.blogUserRepository.save(userEntity);

    return userEntity;
  }

  public async verifyUser(dto: LoginUserDto) {
    const {email, password} = dto;
    const existUser = await this.blogUserRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    if (!await existUser.comparePassword(password)) {
      throw new UnauthorizedException(AUTH_USER_PASSWORD_WRONG);
    }

    return existUser;
  }

  public async getUser(id: string) {
    const user = await this.blogUserRepository.findById(id);

    if (! user) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    return user;
  }
}
