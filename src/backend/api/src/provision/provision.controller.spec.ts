import { Test, TestingModule } from '@nestjs/testing';
import { ProvisionController } from './provision.controller';

describe('ProvisionController', () => {
  let controller: ProvisionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProvisionController],
    }).compile();

    controller = module.get<ProvisionController>(ProvisionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
