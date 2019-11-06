import express from 'express';
import {CommentValidation, IntegerValidation} from '../middlewares/validator';
import MovieController from '../controllers/movies';
import CommentController from '../controllers/comments';
import CharacterController from '../controllers/characters';

const router = express.Router();

const { getAllMovies, getAMovie } = MovieController;
const { createComment, getCommentByMovie } = CommentController;
const { getCharacters } = CharacterController;

router.route('/movies')
  .get(getAllMovies);

router.route('/movies/:id')
  .get([IntegerValidation], getAMovie);

router.route('/comments')
  .post([CommentValidation], createComment);

router.route('/comments/:id')
  .get([IntegerValidation], getCommentByMovie);

router.route('/characters')
  .get(getCharacters);

export default router;
