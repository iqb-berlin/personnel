import { Injectable } from '@nestjs/common';
import { PersonDocument } from '../schema/person.schema';
import { HydratedDocument } from 'mongoose';
import { CreatePersonDto, UpdatePersonDto } from '@personnel/iqb-personnel-dtos';
import { Person } from '../model/person.aggregate';

@Injectable()
export class PersonRepository {

  private static mapToDomainModel(
    personDbDocument: HydratedDocument<PersonDocument, unknown, unknown>
  ): Person {
    return personDbDocument
      ? new Person(
        personDbDocument._id,
        personDbDocument.forename,
        personDbDocument.surname,
        personDbDocument.birthday
      )
      : null;
  }

  create(createPersonDto: CreatePersonDto): Person {
    const person: Person = new Person(null, createPersonDto.forename, createPersonDto.surname, createPersonDto.birthday);
    person.create();

    return person;
  }

  update(id: string, updatePersonDto: UpdatePersonDto): Person {
    const person: Person = new Person(id, updatePersonDto.forename, updatePersonDto.surname, updatePersonDto.birthday);
    person.update();

    return person;
  }

  remove(id: string): Person {
    const person: Person = new Person(id, null, null, null);
    person.delete();

    return person;
  }
}
