import { DataSource } from 'typeorm';
import { User } from '../entity/User';
import { PaymentHistory } from '../entity/PaymentHistory';

export class DatabaseService {
	private readonly dataSource: DataSource;

	constructor() {
		// @TODO env service & logger service
		this.dataSource = new DataSource({
			type: 'postgres',
			// url: 'connection_url', // data from env

			entities: [User, PaymentHistory],

			synchronize: true,
			logging: true,
		});
	}

	public async initialize() {
		console.log('[DatabaseService] Initializing database connection...');

		await this.dataSource.initialize();

		console.log('[DatabaseService] Connected to database');
	}

	public async destroy() {
		await this.dataSource.destroy();
	}
}
