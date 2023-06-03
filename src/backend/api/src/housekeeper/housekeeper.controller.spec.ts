import { Test, TestingModule } from '@nestjs/testing';
import { HousekeeperController } from './housekeeper.controller';

describe('HousekeeperController', () => {
  let controller: HousekeeperController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HousekeeperController],
    }).compile();

    controller = module.get<HousekeeperController>(HousekeeperController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
