import { Test, TestingModule } from '@nestjs/testing';
import { AdministerController } from './administer.controller';

describe('AdministerController', () => {
  let controller: AdministerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdministerController],
    }).compile();

    controller = module.get<AdministerController>(AdministerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
