import { RedisService } from './RedisService';

export class CachingService {
	constructor(private readonly redisService: RedisService) {}

	async get(key: string): Promise<string | null> {
		return this.redisService.get(key);
	}

	async set(key: string, value: string, ttl: number): Promise<void> {
		await this.redisService.set(key, value, ttl);
	}

	async delete(key: string): Promise<void> {
		await this.redisService.delete(key);
	}
}
