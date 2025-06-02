import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { BookDto, CreateBookDto } from './book.dto';

@Injectable()
export class BookRepository {
    constructor(
        @InjectRepository(Book)
        private readonly bookRepo: Repository<Book>,
    ) {}

    async findAll(): Promise<BookDto[]> {
        return this.bookRepo.find();
    }

    async create(bookData: CreateBookDto): Promise<BookDto> {
        const book = this.bookRepo.create(bookData);
        return this.bookRepo.save(book);
    }
}