import { Module } from '@nestjs/common';
import {AuthModule} from "@project/auth-lib";

@Module({
  imports: [AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
