import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { BookRepository } from './book.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  providers: [BookService, BookRepository],
  controllers: [BookController],
})
export class BookModule {}
