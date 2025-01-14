import { Module } from '@nestjs/common';
import {BlogUserModule} from "@project/users-lib";
import {AuthController} from "./auth.controller";
import {AuthService} from "./auth.service";

@Module({
  imports: [BlogUserModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
