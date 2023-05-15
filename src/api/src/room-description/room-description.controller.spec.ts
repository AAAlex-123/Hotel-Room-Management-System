import { Test, TestingModule } from '@nestjs/testing';
import { RoomDescriptionController } from './room-description.controller';

describe('RoomDescriptionController', () => {
  let controller: RoomDescriptionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomDescriptionController],
    }).compile();

    controller = module.get<RoomDescriptionController>(RoomDescriptionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
