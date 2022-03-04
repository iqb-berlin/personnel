import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { PersonService } from './person.service';
import { Person, PersonDocument, PersonSchema } from './schema/person.schema';

describe('PersonService', () => {
  let service: PersonService;
  let spyModel: Model<PersonDocument>;

  beforeEach(async () => {
    const personMockRepository = {
      find: () => {
        return {exec: jest.fn(() => {})};
      },
      findById: () => {
        return {exec: jest.fn(() => {})};
      },
      findAll: () => {
        return {exec: jest.fn(() => {})};
      },
      create: jest.fn(() => {}),
      findByIdAndUpdate: () => {
        return {exec: jest.fn(() => {})};
      },
      findByIdAndDelete: () => {
        return {exec: jest.fn(() => {})};
      }
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [PersonService,
        {
          provide: getModelToken(Person.name),
          useValue: personMockRepository
        }],
    }).compile();

    service = module.get<PersonService>(PersonService);
    spyModel = module.get<Model<PersonDocument>>(getModelToken(Person.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
