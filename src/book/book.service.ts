import { Injectable } from '@nestjs/common';
import { BookRepository } from './book.repository';
import { Book } from './entity/book.entity';
import { BookDto, CreateBookDto } from './dto/book.dto';

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