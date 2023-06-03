import { Test, TestingModule } from '@nestjs/testing';
import { ChambermaidController } from './chambermaid.controller';

describe('ChambermaidController', () => {
  let controller: ChambermaidController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChambermaidController],
    }).compile();

    controller = module.get<ChambermaidController>(ChambermaidController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
