import { Test, TestingModule } from '@nestjs/testing';
import { AdministerService } from './administer.service';

describe('AdministerService', () => {
  let service: AdministerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdministerService],
    }).compile();

    service = module.get<AdministerService>(AdministerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
