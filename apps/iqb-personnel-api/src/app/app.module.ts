import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { PersonModule } from './person/person.module';
import { CqrsHeroModule } from './cqrs-hero/cqrs-hero.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/personnel'),
    PersonModule,
    CqrsHeroModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
