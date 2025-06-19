import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from '../book.controller';
import { BookService } from '../book.service';
import { CreateBookDto } from '../dto/book.dto';

describe('BookController', () => {
  let controller: BookController;

  let mockBookService: {
    findAll: jest.Mock;
    findById: jest.Mock;
    create: jest.Mock;
  };

  beforeEach(async () => {
    mockBookService = {
      findAll: jest
        .fn()
        .mockResolvedValue([{ id: 1, title: 'Test Book', author: 'Author' }]),
      findById: jest
        .fn()
        .mockImplementation((id: number) =>
          Promise.resolve({ id, title: 'Test Book', author: 'Author' }),
        ),
      create: jest
        .fn()
        .mockImplementation((dto: CreateBookDto) =>
          Promise.resolve({ id: 1, ...dto }),
        ),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [{ provide: BookService, useValue: mockBookService }],
    }).compile();

    controller = module.get(BookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of books', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([{ id: 1, title: 'Test Book', author: 'Author' }]);
      expect(mockBookService.findAll).toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('should return a book by id', async () => {
      const result = await controller.findById(1);
      expect(result).toEqual({ id: 1, title: 'Test Book', author: 'Author' });
      expect(mockBookService.findById).toHaveBeenCalledWith(1);
    });
  });

  describe('create', () => {
    it('should create and return a book', async () => {
      const dto: CreateBookDto = { title: 'New Book', author: 'Someone' };
      const result = await controller.create(dto);
      expect(result).toEqual({ id: 1, ...dto });
      expect(mockBookService.create).toHaveBeenCalledWith(dto);
    });
  });
});
