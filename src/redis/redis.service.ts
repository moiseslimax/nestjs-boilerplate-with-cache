import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit {
  private client: Redis;
  private readonly logger = new Logger(RedisService.name);
  private connected = false;

  onModuleInit() {
    this.client = new Redis({ host: 'localhost', port: 6379 });

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
