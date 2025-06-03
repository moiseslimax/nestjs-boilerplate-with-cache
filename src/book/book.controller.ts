import { Body, Controller, Get, Post } from '@nestjs/common';
import { BookService } from './book.service';
import { BookDto, CreateBookDto } from './dto/book.dto';

@Controller('book')
export class BookController {
    constructor(private readonly bookService: BookService) {}
    
    @Get()
    findAll(): Promise<object> {
        return this.bookService.findAll();
    }
    
    @Post()
    create(@Body() book: CreateBookDto): Promise<BookDto> {
        return this.bookService.create(book);
    }
}
