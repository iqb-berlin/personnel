import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { clc } from '@nestjs/common/utils/cli-colors.util';
import { UpdatePersonCommand } from './update-person.command';
import { PersonRepository } from '../repository/person.repository';

@CommandHandler(UpdatePersonCommand)
export class UpdatePersonCommandHandler implements ICommandHandler<UpdatePersonCommand> {
  constructor(
    private readonly repository: PersonRepository,
    private readonly publisher: EventPublisher
  ) {
  }

  async execute(command: UpdatePersonCommand): Promise<void> {
    console.log(clc.green('UpdatePersonCommand...'));

    const { id, updatePersonDto } = command;

    const cqrsPerson = this.publisher.mergeObjectContext(
      await this.repository.update(id, updatePersonDto)
    );

    cqrsPerson.commit();
  }
}
