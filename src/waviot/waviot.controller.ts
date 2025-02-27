import { Controller, Get, Param } from '@nestjs/common';
import { WaviotService } from './waviot.service';

@Controller('waviot')
export class WaviotController {
  constructor(private readonly waviotService: WaviotService) {}

  @Get('statistics')
  async getStatistics() {
    return this.waviotService.getStatistics();
  }

  @Get('counter/:id')
  async getCounterInfo(@Param('id') modemId: string) {
    return this.waviotService.getCounterInfo(modemId);
  }
}
