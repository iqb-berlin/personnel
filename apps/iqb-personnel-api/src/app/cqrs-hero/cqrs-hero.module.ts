import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CqrsHeroController } from './cqrs-hero.controller';
import { HeroRepository } from './repository/hero.repository';
import { CommandHandlers } from './commands/handlers';
import { QueryHandlers } from './queries/handlers';
import { EventHandlers } from './events/handlers';
import { HeroesGameSagas } from './sagas/heroes.sagas';

@Module({
  imports: [CqrsModule],
  controllers: [CqrsHeroController],
  providers: [
    HeroRepository,
    ...CommandHandlers,
    ...QueryHandlers,
    ...EventHandlers,
    HeroesGameSagas
  ]
})
export class CqrsHeroModule {
}
