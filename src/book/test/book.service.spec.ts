import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from '../book.service';
import { BookRepository } from '../book.repository';
import { CreateBookDto } from '../dto/book.dto';
import { RedisService } from '../../redis/redis.service';

describe('BookService', () => {
  let service: BookService;
  let repository: BookRepository;

  const mockBookRepository = {
    findAll: jest.fn().mockResolvedValue([
      { id: 1, title: 'Test Book', author: 'Author' },
    ]),
    findById: jest.fn().mockImplementation((id: number) =>
      Promise.resolve({ id, title: 'Test Book', author: 'Author' }),
    ),
    create: jest.fn().mockImplementation((dto: CreateBookDto) =>
      Promise.resolve({ id: 1, ...dto }),
    ),
  };

  const mockRedisService = {
    get: jest.fn().mockResolvedValue(null),
    set: jest.fn().mockResolvedValue('OK'),
    del: jest.fn().mockResolvedValue(1),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        { provide: BookRepository, useValue: mockBookRepository },
        { provide: RedisService, useValue: mockRedisService },
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

  describe('findById', () => {
    it('should return a book by id', async () => {
      const result = await service.findById(1);
      expect(result).toEqual({ id: 1, title: 'Test Book', author: 'Author' });
      expect(repository.findById).toHaveBeenCalledWith(1);
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