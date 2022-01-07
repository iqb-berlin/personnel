import { NotFoundException } from '@nestjs/common';
import { clc } from '@nestjs/common/utils/cli-colors.util';
import { isNil } from '@nestjs/common/utils/shared.utils';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AddPersonEvent } from './add-person.event';
import { CqrsPersonService } from '../cqrs-person.service';

@EventsHandler(AddPersonEvent)
export class AddPersonEventHandler implements IEventHandler<AddPersonEvent> {
  constructor(
    private readonly service: CqrsPersonService) {
  }

  handle(event: AddPersonEvent): void {
    console.log(clc.yellow(`Async AddPersonEvent ...`));

    const personDto = this.service.create(event.createPersonDto);
    if (isNil(personDto)) {
      throw new NotFoundException('Entity was not found.');
    }
  }
}
