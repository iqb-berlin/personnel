import { Injectable } from '@nestjs/common';
import { HydratedDocument, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePersonDto, PersonDto, UpdatePersonDto } from '@personnel/iqb-personnel-dtos';
import { PersonDocument, PersonEntity } from './schema/person.schema';

@Injectable()
export class CqrsPersonService {
  constructor(
    @InjectModel(PersonEntity.name) private personModel: Model<PersonDocument>
  ) {
  }

  private static mapToDto(
    person: HydratedDocument<PersonDocument, unknown, unknown>
  ): PersonDto {
    return person
      ? {
        id: person._id,
        forename: person.forename,
        surname: person.surname,
        birthday: person.birthday
      }
      : null;
  }

  async create(createPersonDto: CreatePersonDto): Promise<PersonDto> {
    const createdPerson = await this.personModel.create(createPersonDto);
    return CqrsPersonService.mapToDto(createdPerson);
  }

  async findAll(): Promise<PersonDto[]> {
    return (await this.personModel.find().exec()).map((result) => {
      return {
        id: result._id,
        forename: result.forename,
        surname: result.surname,
        birthday: result.birthday
      };
    });
  }

  async findById(id: string): Promise<PersonDto> {
    const readPerson = await this.personModel.findById(id);
    return CqrsPersonService.mapToDto(readPerson);
  }

  async update(id: string, updatePersonDto: UpdatePersonDto): Promise<PersonDto> {
    const updatedPerson = await this.personModel.findByIdAndUpdate(id, updatePersonDto);

    return CqrsPersonService.mapToDto(updatedPerson);
  }

  async remove(id: string): Promise<PersonDto> {
    const deletedPerson = await this.personModel.findByIdAndDelete(id);
    return CqrsPersonService.mapToDto(deletedPerson);
  }
}
