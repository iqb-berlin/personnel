import { Test, TestingModule } from '@nestjs/testing';
import { CqrsHeroController } from './cqrs-hero.controller';

describe('CqrsHeroController', () => {
  let controller: CqrsHeroController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CqrsHeroController]
    }).compile();

    controller = module.get<CqrsHeroController>(CqrsHeroController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
