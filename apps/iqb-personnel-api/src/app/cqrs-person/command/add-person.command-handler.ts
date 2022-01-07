import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { clc } from '@nestjs/common/utils/cli-colors.util';
import { AddPersonCommand } from './add-person.command';
import { PersonRepository } from '../repository/person.repository';
import { Person } from '../model/person.aggregate';

@CommandHandler(AddPersonCommand)
export class AddPersonCommandHandler implements ICommandHandler<AddPersonCommand> {
  constructor(
    private readonly repository: PersonRepository,
    private readonly publisher: EventPublisher
  ) {
  }

  async execute(command: AddPersonCommand): Promise<void> {
    console.log(clc.green('AddPersonCommand...'));

    const { createPersonDto } = command;

    const cqrsPerson: Person = this.publisher.mergeObjectContext(
      await this.repository.create(createPersonDto)
    );
    cqrsPerson.commit();
  }
}
