import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit {
  private client: Redis;
  private readonly logger = new Logger(RedisService.name);
  private connected = false;

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    const host = this.configService.get<string>('REDIS_HOST');
    const port = this.configService.get<number>('REDIS_PORT');

    this.client = new Redis({ host, port });

    this.client.on('error', (err) => {
      this.logger.warn(`Redis connection error: ${err.message}`);
      this.connected = false;
    });

    this.client.on('connect', () => {
      this.connected = true;
      this.logger.log('Connected to Redis');
    });
  }

  async get(key: string): Promise<string | null> {
    if (!this.connected) return null;
    return this.client.get(key);
  }

  async set(key: string, value: string, ttlSeconds: number): Promise<'OK' | null> {
    if (!this.connected) return null;
    return this.client.set(key, value, 'EX', ttlSeconds);
  }

  async del(key: string): Promise<number | null> {
    if (!this.connected) return null;
    return this.client.del(key);
  }
}
