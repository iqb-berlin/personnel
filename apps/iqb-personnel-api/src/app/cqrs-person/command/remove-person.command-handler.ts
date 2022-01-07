import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { clc } from '@nestjs/common/utils/cli-colors.util';
import { RemovePersonCommand } from './remove-person.command';
import { PersonRepository } from '../repository/person.repository';

@CommandHandler(RemovePersonCommand)
export class RemovePersonCommandHandler implements ICommandHandler<RemovePersonCommand> {
  constructor(
    private readonly repository: PersonRepository,
    private readonly publisher: EventPublisher
  ) {
  }

  async execute(command: RemovePersonCommand): Promise<void> {
    console.log(clc.green('RemovePersonCommand...'));

    const { id } = command;

    const cqrsPerson = this.publisher.mergeObjectContext(
      await this.repository.remove(id)
    );

    cqrsPerson.commit();
  }
}
