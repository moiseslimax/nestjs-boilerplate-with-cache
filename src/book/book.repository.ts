import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entity/book.entity';
import { BookDto, CreateBookDto } from './dto/book.dto';

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