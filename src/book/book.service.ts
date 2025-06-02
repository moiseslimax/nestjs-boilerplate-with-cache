import { Injectable } from '@nestjs/common';
import { BookRepository } from './book.repository';
import { Book } from './book.entity';
import { BookDto, CreateBookDto } from './book.dto';

@Injectable()
export class BookService {
    constructor(private readonly bookRepository: BookRepository) {}

    async findAll(): Promise<object[]> {
        return await this.bookRepository.findAll();
    }

    async create(book: CreateBookDto): Promise<BookDto> {
        return await this.bookRepository.create(book)
    }
}