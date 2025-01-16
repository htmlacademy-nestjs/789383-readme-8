import {Module} from '@nestjs/common';
import {UsersConfigModule, BlogUserModule, getMongooseOptions} from "@project/users-lib";
import {MongooseModule} from "@nestjs/mongoose";

@Module({
  imports: [
    BlogUserModule,
    UsersConfigModule,
    MongooseModule.forRootAsync(
      getMongooseOptions()
    )
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}

