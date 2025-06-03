import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from '../book.service';
import { BookRepository } from '../book.repository';
import { CreateBookDto } from '../dto/book.dto';

describe('BookService', () => {
  let service: BookService;
  let repository: BookRepository;

  const mockBookRepository = {
    findAll: jest.fn().mockResolvedValue([
      { id: 1, title: 'Test Book', author: 'Author' },
    ]),
    create: jest.fn().mockImplementation((dto: CreateBookDto) =>
      Promise.resolve({ id: 1, ...dto }),
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        { provide: BookRepository, useValue: mockBookRepository },
      ],
    }).compile();

    service = module.get<BookService>(BookService);
    repository = module.get<BookRepository>(BookRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of books', async () => {
      const result = await service.findAll();
      expect(result).toEqual([
        { id: 1, title: 'Test Book', author: 'Author' },
      ]);
      expect(repository.findAll).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should create and return a book', async () => {
      const dto: CreateBookDto = { title: 'New Book', author: 'Someone' };
      const result = await service.create(dto);
      expect(result).toEqual({ id: 1, ...dto });
      expect(repository.create).toHaveBeenCalledWith(dto);
    });
  });
});