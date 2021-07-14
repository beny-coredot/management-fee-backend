import { Test, TestingModule } from '@nestjs/testing';
import { AdministersController } from './administers.controller';

describe('AdministersController', () => {
  let controller: AdministersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdministersController],
    }).compile();

    controller = module.get<AdministersController>(AdministersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
