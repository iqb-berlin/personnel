import { UpdatePersonEventHandler } from './update-person.event-handler';
import { AddPersonEventHandler } from './add-person.event-handler';
import { RemovePersonEventHandler } from './remove-person.event-handler';

export const EventHandlers = [
  AddPersonEventHandler,
  UpdatePersonEventHandler,
  RemovePersonEventHandler
];
