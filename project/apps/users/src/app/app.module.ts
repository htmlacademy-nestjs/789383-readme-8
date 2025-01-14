import {Module} from '@nestjs/common';
import {BlogUserModule} from "@project/users-lib";

@Module({
  imports: [BlogUserModule],
  controllers: [],
  providers: [],
})
export class AppModule {
}

