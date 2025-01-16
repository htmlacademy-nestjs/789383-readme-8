import {applyDecorators, HttpStatus} from '@nestjs/common';
import {ApiOperation, ApiResponse} from '@nestjs/swagger';
import {LoggedUserRdo} from '../rdo/logged-user.rdo';

export function LoginUserApiDocs() {
  return applyDecorators(
    ApiOperation({summary: 'Авторизация пользователя'}),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Пользователь успешно авторизован',
      type: LoggedUserRdo,
    }),
    ApiResponse({
      status: HttpStatus.UNAUTHORIZED,
      description: 'Неверный email или пароль',
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Неверные данные авторизации',
    }),
  );
}
