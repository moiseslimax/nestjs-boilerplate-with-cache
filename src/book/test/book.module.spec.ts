import { Test, TestingModule } from '@nestjs/testing';
import { BookModule } from '../book.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Book } from '../entity/book.entity';

describe('BookModule', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [BookModule],
    })
      .overrideProvider(getRepositoryToken(Book))
      .useValue({})
      .overrideProvider('RedisService')
      .useValue({
        get: jest.fn(),
        set: jest.fn(),
        del: jest.fn(),
      })
      .compile();
  });

  it('should compile the module', () => {
    expect(module).toBeDefined();
  });
});
