import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { BookService } from './book.service';
import { BookDto, CreateBookDto } from './dto/book.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  findAll(): Promise<object> {
    return this.bookService.findAll();
  }

  @Get('/:id')
  findById(@Param('id', ParseIntPipe) id: number): Promise<object> {
    return this.bookService.findById(id);
  }

  @Post()
  create(@Body() book: CreateBookDto): Promise<BookDto> {
    return this.bookService.create(book);
  }
}
