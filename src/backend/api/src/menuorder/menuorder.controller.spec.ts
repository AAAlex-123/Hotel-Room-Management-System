import { Test, TestingModule } from '@nestjs/testing';
import { MenuorderController } from './menuorder.controller';

describe('MenuorderController', () => {
  let controller: MenuorderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MenuorderController],
    }).compile();

    controller = module.get<MenuorderController>(MenuorderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
