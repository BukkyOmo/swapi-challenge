import express from 'express';
import { UserValidation } from '../middlewares/validator';
import UserController from '../controllers/users';

const router = express.Router();

const { signupUser, signinUser } = UserController;

router.route('/auth/signup')
  .post([UserValidation], signupUser);

router.route('/auth/signin')
  .post([UserValidation], signinUser);

export default router;
