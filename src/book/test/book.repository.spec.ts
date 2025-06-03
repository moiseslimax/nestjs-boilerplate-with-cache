import { Test, TestingModule } from '@nestjs/testing';
import { BookRepository } from '../book.repository';
import { Repository } from 'typeorm';
import { Book } from '../entity/book.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateBookDto } from '../dto/book.dto';

describe('BookRepository', () => {
  let repository: BookRepository;
  let typeOrmRepo: Repository<Book>;

  const mockTypeOrmRepo = {
    find: jest.fn().mockResolvedValue([
      { id: 1, title: 'Test Book', author: 'Author' },
    ]),
    create: jest.fn().mockImplementation((dto: CreateBookDto) => dto),
    save: jest.fn().mockImplementation((book: any) =>
      Promise.resolve({ id: 1, ...book }),
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookRepository,
        {
          provide: getRepositoryToken(Book),
          useValue: mockTypeOrmRepo,
        },
      ],
    }).compile();

    repository = module.get<BookRepository>(BookRepository);
    typeOrmRepo = module.get<Repository<Book>>(getRepositoryToken(Book));
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of books', async () => {
      const result = await repository.findAll();
      expect(result).toEqual([
        { id: 1, title: 'Test Book', author: 'Author' },
      ]);
      expect(typeOrmRepo.find).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should create and return a book', async () => {
      const dto: CreateBookDto = { title: 'New Book', author: 'Someone' };
      const result = await repository.create(dto);
      expect(result).toEqual({ id: 1, ...dto });
      expect(typeOrmRepo.create).toHaveBeenCalledWith(dto);
      expect(typeOrmRepo.save).toHaveBeenCalled();
    });
  });
});