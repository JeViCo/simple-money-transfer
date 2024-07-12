import 'reflect-metadata';
import { DatabaseService } from './service/DatabaseService';
import { WebApiService } from './api/WebApiService';
import { RedisService } from './service/RedisService';
import { UserService } from './service/UserService';
import { CachingService } from './service/CachingService';

const redisService = new RedisService();
const dbService = new DatabaseService();

const connection = Promise.all([
	redisService.initialize(),
	dbService.initialize(),
]);

connection
	.then(() => {
		const cachingService = new CachingService(redisService);
		const userService = new UserService(cachingService);
		const webApiService = new WebApiService(userService);
		webApiService.listen(3000);
	})
	.catch((error: unknown) => console.log(error));
