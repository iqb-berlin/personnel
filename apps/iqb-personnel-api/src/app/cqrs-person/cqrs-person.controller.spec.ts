import { Test, TestingModule } from '@nestjs/testing';
import { CqrsPersonController } from './cqrs-person.controller';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

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
