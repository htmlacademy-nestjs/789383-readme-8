import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {LoginUserDto} from "./dto/login-user.dto";
import {plainToInstance} from "class-transformer";
import {UserRdo} from "./rdo/user.rdo";
import {LoggedUserRdo} from "./rdo/logged-user.rdo";
import {ApiTags} from "@nestjs/swagger";
import {GetUserApiDocs, LoginUserApiDocs, RegisterUserApiDocs} from "./decorators/auth-swagger.decorator";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {
  }

  @Post('register')
  @RegisterUserApiDocs()
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);
    return plainToInstance(UserRdo, newUser.toPOJO(), { excludeExtraneousValues: true });
  }

  @Post('login')
  @LoginUserApiDocs()
  public async login(@Body() dto: LoginUserDto) {
    const verifiedUser = await this.authService.verifyUser(dto);
    return plainToInstance(LoggedUserRdo, verifiedUser.toPOJO(), { excludeExtraneousValues: true });
  }

  @Get(':id')
  @GetUserApiDocs()
  public async show(@Param('id') id: string) {
    const existUser = await this.authService.getUser(id);
    return plainToInstance(UserRdo, existUser.toPOJO(), { excludeExtraneousValues: true });
  }
}
