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
      .compile();
  });

  it('should compile the module', () => {
    expect(module).toBeDefined();
  });
});