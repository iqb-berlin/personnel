import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { KillDragonDto } from './interfaces/kill-dragon-dto.interface';
import { KillDragonCommand } from './commands/impl/kill-dragon.command';
import { Hero } from './models/hero.model';
import { GetHeroesQuery } from './queries/impl/get-heroes.query';

@Controller('cqrs-hero')
export class CqrsHeroController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {
  }

  @Post(':id/kill')
  async killDragon(@Param('id') id: string, @Body() dto: KillDragonDto) {
    console.log(`Hero id: ${id}`);
    console.log(`Dragon id: ${dto.dragonId}`);
    return this.commandBus.execute(new KillDragonCommand(id, dto.dragonId));
  }

  @Get()
  async findAllHeros(): Promise<Hero[]> {
    return this.queryBus.execute(new GetHeroesQuery());
  }
}
