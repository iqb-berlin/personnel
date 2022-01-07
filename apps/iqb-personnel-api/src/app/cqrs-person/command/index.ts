import { AddPersonCommandHandler } from './add-person.command-handler';
import { RemovePersonCommandHandler } from './remove-person.command-handler';
import { UpdatePersonCommandHandler } from './update-person.command-handler';

export const CommandHandlers = [
  AddPersonCommandHandler,
  RemovePersonCommandHandler,
  UpdatePersonCommandHandler
];
