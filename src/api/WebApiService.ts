import express from 'express';
import { UserController } from '../controller/UserController';
import { UserService } from '../service/UserService';

export class WebApiService {
	private app = express();
	private userController: UserController;

	constructor(userService: UserService) {
		this.userController = new UserController(userService);

		this.app.use(express.json());
		this.app.post('/take_money', (req, res) =>
			this.userController.takeMoney(req, res),
		);
	}

	listen(port: number): void {
		this.app.listen(port, () => {
			console.log(`Server is running on port ${port}`);
		});
	}
}
