import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreatePersonDto, PersonDto, UpdatePersonDto } from '@personnel/iqb-personnel-dtos';
import { AddPersonCommand } from './command/add-person.command';
import { UpdatePersonCommand } from './command/update-person.command';
import { RemovePersonCommand } from './command/remove-person.command';
import { FindAllPersonsQuery } from './query/find-all-persons.query';
import { FindPersonByIdQuery } from './query/find-person-by-id.query';

@Controller('cqrs-person')
export class CqrsPersonController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {
  }

  @Get()
  async findAllPersons(): Promise<PersonDto[]> {
    return this.queryBus.execute(new FindAllPersonsQuery());
  }

  @Get(':id')
  async findPersonById(@Param('id') id: string): Promise<PersonDto> {
    return this.queryBus.execute(new FindPersonByIdQuery(id));
  }

  @Post()
  addPerson(@Body() createPersonDto: CreatePersonDto): Promise<void> {
    return this.commandBus.execute(new AddPersonCommand(createPersonDto));
  }

  @Patch(':id')
  updatePerson(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto): Promise<void> {
    return this.commandBus.execute(new UpdatePersonCommand(id, updatePersonDto));
  }

  @Delete(':id')
  removePerson(@Param('id') id: string): Promise<void> {
    return this.commandBus.execute(new RemovePersonCommand(id));
  }
}
