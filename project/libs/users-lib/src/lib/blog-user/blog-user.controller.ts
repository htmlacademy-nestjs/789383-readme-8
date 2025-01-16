import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {BlogUserRepository} from "./blog-user.repository";
import {BlogUserService} from "./blog-user.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {plainToInstance} from "class-transformer";
import {UserRdo} from "./rdo/user.rdo";
import {GetUserApiDocs, RegisterUserApiDocs} from "./decorators/auth-swagger.decorator";

@Controller('users')
export class BlogUserController {
  constructor(
    private readonly blogUserRepository: BlogUserRepository,
    private readonly blogUserService: BlogUserService
  ) {
  }

  @Post('register')
  @RegisterUserApiDocs()
  async register(@Body() dto: CreateUserDto) {
    const newUser = await this.blogUserService.register(dto);
    return plainToInstance(UserRdo, newUser.toPOJO(), {excludeExtraneousValues: true});
  }

  @Get(':id')
  @GetUserApiDocs()
  public async show(@Param('id') id: string) {
    const existUser = await this.blogUserRepository.findById(id);
    return plainToInstance(UserRdo, existUser.toPOJO(), {excludeExtraneousValues: true});
  }
}
