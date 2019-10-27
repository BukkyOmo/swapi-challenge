import express from 'express';
import { UserValidation } from '../middlewares/validator';
import UserController from '../controllers/users';

const router = express.Router();

const { signupUser } = UserController;

router.route('/auth/signup')
	.post([UserValidation], signupUser);

export default router;
