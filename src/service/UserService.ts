import { User } from '../entity/User';
import { PaymentHistory } from '../entity/PaymentHistory';
import { CachingService } from './CachingService';

export enum MoneyAction {
	ItemBuy = 'item_buy',
}

export class UserService {
	constructor(private readonly cache: CachingService) {}

	async takeMoney(
		user_id: number,
		amount: number,
	): Promise<{ message: string; balance?: number }> {
		const user = await User.findOneBy({ id: user_id });

		if (!user) {
			return { message: 'User not found' };
		}

		const cacheKey = `user_balance_${user_id}`;
		const cachedBalance = await this.cache.get(cacheKey);

		const balance = cachedBalance ? parseInt(cachedBalance) : user.balance;

		if (balance < amount) {
			return { message: 'Not enough money' };
		}

		const newBalance = balance - amount;

		user.balance = newBalance;
		await user.save();

		await this.cache.set(cacheKey, newBalance.toString(), 60);

		const paymentHistory = new PaymentHistory();
		paymentHistory.user_id = user_id;
		paymentHistory.action = MoneyAction.ItemBuy;
		paymentHistory.amount = amount;
		paymentHistory.ts = new Date();
		await paymentHistory.save();

		return { message: 'Money taken successfully', balance: user.balance };
	}
}
