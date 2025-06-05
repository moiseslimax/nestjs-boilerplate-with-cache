import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { ConfigAppModule } from '../config/config.module';

@Module({
  imports: [ConfigAppModule], 
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}