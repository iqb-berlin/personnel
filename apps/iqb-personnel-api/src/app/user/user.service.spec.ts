import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserService } from './user.service';
import { User, UserDocument } from './schema/user.schema';

describe('UserService', () => {
  let service: UserService;
  let spyModel: Model<UserDocument>;

  beforeEach(async () => {
    const personMockRepository = {
      find: () => {
        return {
          exec: jest.fn(() => {}),
        };
      },
      findById: () => {
        return {
          exec: jest.fn(() => {}),
        };
      },
      findAll: () => {
        return {
          exec: jest.fn(() => {}),
        };
      },
      create: jest.fn(() => {}),
      findByIdAndUpdate: () => {
        return {
          exec: jest.fn(() => {}),
        };
      },
      findByIdAndDelete: () => {
        return {
          exec: jest.fn(() => {}),
        };
      },
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: personMockRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    spyModel = module.get<Model<UserDocument>>(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
