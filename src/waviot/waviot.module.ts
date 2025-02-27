import { Module } from '@nestjs/common';
import { WaviotService } from './waviot.service';
import { WaviotController } from './waviot.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [WaviotService],
  controllers: [WaviotController],
})
export class WaviotModule {}
