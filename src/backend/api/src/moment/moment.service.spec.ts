import { Test, TestingModule } from '@nestjs/testing';
import { MomentService } from './moment.service';

describe('MomentService', () => {
  let service: MomentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MomentService],
    }).compile();

    service = module.get<MomentService>(MomentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
