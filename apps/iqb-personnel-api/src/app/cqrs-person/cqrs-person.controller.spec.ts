import { Test, TestingModule } from '@nestjs/testing';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CqrsPersonController } from './cqrs-person.controller';

describe('CqrsPersonController', () => {
  let controller: CqrsPersonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CqrsPersonController],
      providers: [
        CommandBus,
        QueryBus
      ]
    }).compile();

    controller = module.get<CqrsPersonController>(CqrsPersonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
