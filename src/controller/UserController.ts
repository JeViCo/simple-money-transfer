import { Request, Response } from 'express';
import { UserService } from '../service/UserService';

export class UserController {
	constructor(private readonly userService: UserService) {}

	async takeMoney(req: Request, res: Response): Promise<void> {
		const { user_id, amount } = req.body;

		try {
			const result = await this.userService.takeMoney(user_id, amount);
			if (result.balance !== undefined) {
				res.json(result);
			} else {
				res.status(400).json(result);
			}
		} catch (error) {
			res.status(500).json({ error: 'Internal server error' });
		}
	}
}
