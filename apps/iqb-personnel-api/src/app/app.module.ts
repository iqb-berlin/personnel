import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { PersonModule } from './person/person.module';
import { CqrsPersonModule } from './cqrs-person/cqrs-person.module';
import { CqrsHeroModule } from './cqrs-hero/cqrs-hero.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/personnel'),
    PersonModule,
    CqrsPersonModule,
    CqrsHeroModule,
    UserModule,
    AuthenticationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
