import { Injectable } from '@nestjs/common';
import { HydratedDocument, Model } from 'mongoose';
import { Person, PersonDocument } from './schemas/person.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePersonDto, PersonDto, UpdatePersonDto } from '@personnel/iqb-personnel-dtos';

@Injectable()
export class PersonService {
  constructor(
    @InjectModel(Person.name) private personModel: Model<PersonDocument>,
  ) {
  }

  async create(createPersonDto: CreatePersonDto): Promise<PersonDto> {
    const createdPerson = await this.personModel.create(createPersonDto);
    return PersonService.mapToDto(createdPerson);
  }

  async findAll(): Promise<PersonDto[]> {
    return (await this.personModel.find().exec()).map((result) => {
      return {
        id: result._id,
        forename: result.forename,
        surname: result.surname,
        birthday: result.birthday,
      };
    });
  }

  async findById(id: string): Promise<PersonDto> {
    const readPerson = await this.personModel.findById(id);
    return PersonService.mapToDto(readPerson);
  }

  async update(
    id: string,
    updatePersonDto: UpdatePersonDto,
  ): Promise<PersonDto> {
    const updatedPerson = await this.personModel.findByIdAndUpdate(
      id,
      updatePersonDto,
    );
    return PersonService.mapToDto(updatedPerson);
  }

  async remove(id: string): Promise<PersonDto> {
    const deletedPerson = await this.personModel.findByIdAndDelete(id);
    return PersonService.mapToDto(deletedPerson);
  }

  private static mapToDto(
    person: HydratedDocument<PersonDocument, unknown, unknown>,
  ): PersonDto {
    return person
      ? {
        id: person._id,
        forename: person.forename,
        surname: person.surname,
        birthday: person.birthday,
      }
      : null;
  }
}
