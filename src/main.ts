import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(process.env.PORT ?? 3000);
  } catch (error) {
    Logger.error('Environment validation failed:', error);
    process.exit(1);
  }
 
}
bootstrap();
