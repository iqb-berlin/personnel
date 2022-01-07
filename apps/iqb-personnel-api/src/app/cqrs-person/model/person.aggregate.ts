import { AggregateRoot } from '@nestjs/cqrs';
import { AddPersonEvent } from '../event/add-person.event';
import { UpdatePersonEvent } from '../event/update-person.event';
import { RemovePersonEvent } from '../event/remove-person.event';

export class Person extends AggregateRoot {
  constructor(
    private readonly id: string,
    private readonly forename: string,
    private readonly surname: string,
    private readonly birthday: Date
  ) {
    super();
  }

  getId(): string {
    return this.id;
  }

  getForename(): string {
    return this.forename;
  }

  getSurname(): string {
    return this.surname;
  }

  getBirthday(): Date {
    return this.birthday;
  }

  create() {
    this.apply(new AddPersonEvent({
      forename: this.forename,
      surname: this.surname,
      birthday: this.birthday
    }));
  }

  update() {
    this.apply(new UpdatePersonEvent(this.id, {
      forename: this.forename,
      surname: this.surname,
      birthday: this.birthday
    }));
  }

  delete() {
    this.apply(new RemovePersonEvent(this.id));
  }
}
