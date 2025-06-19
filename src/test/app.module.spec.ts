import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Book } from '../book/entity/book.entity';
import { RedisService } from '../redis/redis.service';
import { ConfigAppModule } from '../config/config.module';

describe('AppModule', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [ConfigAppModule, AppModule],
    })
      .overrideProvider(getRepositoryToken(Book))
      .useValue({
        find: jest.fn(),
        findOneBy: jest.fn(),
        create: jest.fn(),
        save: jest.fn(),
        delete: jest.fn(),
      })
      .overrideProvider(RedisService)
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
