import { Test, TestingModule } from '@nestjs/testing';
import { DirtyServiceService } from './dirty-service.service';

describe('DirtyServiceService', () => {
  let service: DirtyServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DirtyServiceService],
    }).compile();

    service = module.get<DirtyServiceService>(DirtyServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
