import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {LoginUserDto} from "./dto/login-user.dto";
import {plainToInstance} from "class-transformer";
import {LoggedUserRdo} from "./rdo/logged-user.rdo";
import {ApiTags} from "@nestjs/swagger";
import {LoginUserApiDocs} from "./decorators/auth-swagger.decorator";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {
  }

  @Post('login')
  @LoginUserApiDocs()
  public async login(@Body() dto: LoginUserDto) {
    const verifiedUser = await this.authService.verifyUser(dto);
    return plainToInstance(LoggedUserRdo, verifiedUser.toPOJO(), {excludeExtraneousValues: true});
  }
}
