import {applyDecorators, HttpStatus} from '@nestjs/common';
import {ApiOperation, ApiResponse} from '@nestjs/swagger';
import {UserRdo} from "../rdo/user.rdo";

export function RegisterUserApiDocs() {
  return applyDecorators(
    ApiOperation({summary: 'Регистрация нового пользователя'}),
    ApiResponse({
      status: HttpStatus.CREATED,
      description: 'Пользователь успешно создан',
      type: UserRdo,
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Неверные данные для создания пользователя',
    }),
  );
}

export function GetUserApiDocs() {
  return applyDecorators(
    ApiOperation({summary: 'Получить информацию о пользователе по ID'}),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Пользователь найден',
      type: UserRdo,
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'Пользователь не найден',
    }),
  );
}
