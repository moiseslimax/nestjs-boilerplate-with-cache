import { Injectable } from '@nestjs/common';
import { BookRepository } from './book.repository';
import { Book } from './entity/book.entity';
import { BookDto, CreateBookDto } from './dto/book.dto';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class BookService {
    constructor(
        private readonly bookRepository: BookRepository,
        private readonly redisService: RedisService,
    ) {}

    async findAll(): Promise<object[]> {
        return await this.bookRepository.findAll();
    }

    async findById(id: number): Promise<BookDto> {
        const cacheKey = `book:${id}`;
        const cached = await this.redisService.get(cacheKey);
        if (cached) {
            return JSON.parse(cached);
        }
        const book = await this.bookRepository.findById(id);
        await this.redisService.set(cacheKey, JSON.stringify(book), 3600);
        return book;
    }

    async create(book: CreateBookDto): Promise<BookDto> {
        return await this.bookRepository.create(book)
    }
}