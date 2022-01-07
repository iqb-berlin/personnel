import { NotFoundException } from '@nestjs/common';
import { clc } from '@nestjs/common/utils/cli-colors.util';
import { isNil } from '@nestjs/common/utils/shared.utils';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { RemovePersonEvent } from './remove-person.event';
import { CqrsPersonService } from '../cqrs-person.service';

@EventsHandler(RemovePersonEvent)
export class RemovePersonEventHandler implements IEventHandler<RemovePersonEvent> {
  constructor(
    private readonly service: CqrsPersonService) {
  }

  handle(event: RemovePersonEvent): void {
    console.log(clc.yellow(`Async RemovePersonEvent(id: ${event.id}) ...`));

    const personDto = this.service.remove(event.id);
    if (isNil(personDto)) {
      throw new NotFoundException('Entity was not found.');
    }
  }
}
