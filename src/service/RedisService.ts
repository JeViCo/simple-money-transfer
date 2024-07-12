import Redis from 'ioredis';

export class RedisService {
	private client: Redis;

	constructor() {
		this.client = new Redis({
			// @TODO env service
			// host: 'localhost',
			// port: 6379,
		});
	}

	public async initialize() {
		console.log('[RedisService] Initializing caching database connection...');

		await this.client.connect();

		console.log('[RedisService] Connected to caching database');
	}

	async get(key: string): Promise<string | null> {
		return await this.client.get(key);
	}

	async set(key: string, value: string, ttl: number): Promise<void> {
		await this.client.set(key, value, 'EX', ttl);
	}

	async delete(key: string): Promise<void> {
		await this.client.del(key);
	}
}
