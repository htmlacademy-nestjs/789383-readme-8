import {Injectable, NotFoundException, UnauthorizedException} from "@nestjs/common";
import {AUTH_USER_NOT_FOUND, AUTH_USER_PASSWORD_WRONG} from "./auth.constant";
import {LoginUserDto} from "./dto/login-user.dto";
import {HttpService} from "@nestjs/axios";

@Injectable()
export class AuthService {
  constructor(
    private readonly httpService: HttpService,
  ) {
  }

  private usersServiceUrl = 'http://localhost:4000/api/users';

  public async verifyUser(dto: LoginUserDto) {
    const {email, password} = dto;
    //todo
    const existUser = null;

    if (!existUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    if (!await existUser.comparePassword(password)) {
      throw new UnauthorizedException(AUTH_USER_PASSWORD_WRONG);
    }

    return existUser;
  }
}
