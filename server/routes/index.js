import express from 'express';
import { UserValidation, CommentValidation, IntegerValidation} from '../middlewares/validator';
import UserController from '../controllers/users';
import MovieController from '../controllers/movies';
import CommentController from '../controllers/comments';
import CharacterController from '../controllers/characters';
import VerifyToken from '../middlewares/auth';

const router = express.Router();

const { signupUser, signinUser } = UserController;
const { getAllMovies, getAMovie } = MovieController;
const { createComment, getCommentByMovie } = CommentController;
const { getCharacters } = CharacterController;

router.route('/auth/signup')
  .post([UserValidation], signupUser);

router.route('/auth/signin')
  .post([UserValidation], signinUser);

router.route('/movies')
  .get([VerifyToken], getAllMovies);

router.route('/movies/:id')
  .get([VerifyToken, IntegerValidation], getAMovie);

router.route('/comments')
  .post([VerifyToken, CommentValidation], createComment);

router.route('/comments/:id')
  .get([VerifyToken, IntegerValidation], getCommentByMovie);

router.route('/characters')
  .get([VerifyToken], getCharacters);

export default router;
