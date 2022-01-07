import { NotFoundException } from '@nestjs/common';
import { clc } from '@nestjs/common/utils/cli-colors.util';
import { isNil } from '@nestjs/common/utils/shared.utils';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UpdatePersonEvent } from './update-person.event';
import { CqrsPersonService } from '../cqrs-person.service';

@EventsHandler(UpdatePersonEvent)
export class UpdatePersonEventHandler implements IEventHandler<UpdatePersonEvent> {
  constructor(
    private readonly service: CqrsPersonService) {
  }

  handle(event: UpdatePersonEvent): void {
    console.log(clc.yellow(`Async UpdatePersonEvent(id: ${event.id}) ...`));

    const personDto = this.service.update(event.id, event.updatePersonDto);
    if (isNil(personDto)) {
      throw new NotFoundException('Entity was not found.');
    }
  }
}
