import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { DatabaseModule } from './database/database.module';
import { RedisService } from './redis/redis.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [BookModule, ConfigModule.forRoot({isGlobal: true}),DatabaseModule],
  controllers: [AppController],
  providers: [AppService, RedisService],
  exports: [RedisService], 
})
export class AppModule {}
