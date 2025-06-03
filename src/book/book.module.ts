import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entity/book.entity';
import { BookRepository } from './book.repository';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [TypeOrmModule.forFeature([Book]), RedisModule],
  providers: [BookService, BookRepository],
  controllers: [BookController],
})
export class BookModule {}
