import { Test, TestingModule } from '@nestjs/testing';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';

jest.mock('./person.service');

describe('PersonController', () => {
  let controller: PersonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PersonController],
      providers: [PersonService],
    }).compile();

    controller = module.get<PersonController>(PersonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
