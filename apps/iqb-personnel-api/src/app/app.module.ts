import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { PersonModule } from './person/person.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongodb:27017/personnel'),
    PersonModule,
    UserModule,
    AuthenticationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
