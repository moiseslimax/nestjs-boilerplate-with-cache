import { IsString, IsInt } from 'class-validator';

export class CreateBookDto {
  @IsString()
  title: string;

  @IsString()
  author: string;
}

export class BookDto extends CreateBookDto {
  @IsInt()
  id: number;
}
