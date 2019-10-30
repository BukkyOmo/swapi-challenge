import express from 'express';
import { UserValidation } from '../middlewares/validator';
import UserController from '../controllers/users';
import MovieController from '../controllers/movies';
import VerifyToken from '../middlewares/auth';

const router = express.Router();

const { signupUser, signinUser } = UserController;
const { getAllMovies, getAMovie } = MovieController;

router.route('/auth/signup')
  .post([UserValidation], signupUser);

router.route('/auth/signin')
  .post([UserValidation], signinUser);

router.route('/movies')
  .get([VerifyToken], getAllMovies);

router.route('/movies/:id')
  .get([VerifyToken], getAMovie);

export default router;
