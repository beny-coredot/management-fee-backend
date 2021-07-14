import { Test, TestingModule } from '@nestjs/testing';
import { AdministersService } from './administers.service';

describe('AdministersService', () => {
  let service: AdministersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdministersService],
    }).compile();

    service = module.get<AdministersService>(AdministersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
