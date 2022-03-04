import { Test, TestingModule } from '@nestjs/testing';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CqrsHeroController } from './cqrs-hero.controller';

jest.mock('@nestjs/cqrs');

describe('CqrsHeroController', () => {
  let controller: CqrsHeroController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CqrsHeroController],
      providers: [CommandBus, QueryBus],
    }).compile();

    controller = module.get<CqrsHeroController>(CqrsHeroController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
