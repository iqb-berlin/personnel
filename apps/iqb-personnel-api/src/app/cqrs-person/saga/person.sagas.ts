import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import * as clc from 'cli-color';
import { mergeMap, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AddPersonCommand } from '../command/add-person.command';
import { UpdatePersonEvent } from '../event/update-person.event';
import { RemovePersonCommand } from '../command/remove-person.command';

@Injectable()
export class PersonSagas {

  // Saga sample to demonstrate a command chain
  // Redundant functionality, remove for productive use!
  @Saga()
  personUpdated = (events$: Observable<any>): Observable<any> => {
    return events$.pipe(
      ofType(UpdatePersonEvent),
      map((event: UpdatePersonEvent) => {
        console.log(clc.redBright('Inside [PersonSagas] Person Updated Saga'));
        const commands: ICommand[] = [
          new RemovePersonCommand(event.id),
          new AddPersonCommand({
            forename: event.updatePersonDto.forename ? event.updatePersonDto.forename : 'Peter',
            surname: event.updatePersonDto.surname ? event.updatePersonDto.surname : 'Parker',
            birthday: event.updatePersonDto.birthday ? event.updatePersonDto.birthday : new Date('2000-04-15T03:04:09.998Z')
          })
        ];
        return commands;
      }),
      mergeMap(command => command)
    );
  };
}
