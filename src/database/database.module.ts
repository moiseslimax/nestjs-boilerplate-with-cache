import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'booksdb',
      autoLoadEntities: true,
      synchronize: true, // set to false in production!
    }),
  ],
})
export class DatabaseModule {}