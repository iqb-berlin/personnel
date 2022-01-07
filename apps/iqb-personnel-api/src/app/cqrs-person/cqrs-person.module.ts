import { Module } from '@nestjs/common';
import { CqrsPersonController } from './cqrs-person.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { EventHandlers } from './event';
import { CommandHandlers } from './command';
import { PersonRepository } from './repository/person.repository';
import { QueryHandlers } from './query';
import { MongooseModule } from '@nestjs/mongoose';
import { PersonEntity, PersonSchema } from './schema/person.schema';
import { PersonSagas } from './saga/person.sagas';
import { CqrsPersonService } from './cqrs-person.service';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: PersonEntity.name, schema: PersonSchema }])
  ],
  controllers: [CqrsPersonController],
  providers: [
    CqrsPersonService,
    ...CommandHandlers,
    ...QueryHandlers,
    ...EventHandlers,
    PersonRepository,
    PersonSagas
  ]
})
export class CqrsPersonModule {
}
