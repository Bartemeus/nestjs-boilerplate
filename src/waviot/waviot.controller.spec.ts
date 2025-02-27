import { Test, TestingModule } from '@nestjs/testing';
import { WaviotController } from './waviot.controller';

describe('WaviotController', () => {
  let controller: WaviotController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WaviotController],
    }).compile();

    controller = module.get<WaviotController>(WaviotController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
