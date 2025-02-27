import { Module } from '@nestjs/common';
import { WaviotService } from './waviot.service';
import { WaviotController } from './waviot.controller';

@Module({
  providers: [WaviotService],
  controllers: [WaviotController]
})
export class WaviotModule {}
