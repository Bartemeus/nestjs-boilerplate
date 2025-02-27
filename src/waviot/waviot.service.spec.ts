import { Test, TestingModule } from '@nestjs/testing';
import { WaviotService } from './waviot.service';

describe('WaviotService', () => {
  let service: WaviotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WaviotService],
    }).compile();

    service = module.get<WaviotService>(WaviotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
