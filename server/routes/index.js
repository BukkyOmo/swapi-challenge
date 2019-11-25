import express from 'express';
import { CommentValidation, IntegerValidation, ValidateMovieInBody, ValidateMovieCharacters, ValidateMovieParams } from '../middlewares/validator';
import MovieController from '../controllers/movies';
import CommentController from '../controllers/comments';
import CharacterController from '../controllers/characters';

const router = express.Router();

router.route('/movies')
  .get(MovieController.getAllMovies);

router.route('/comments')
  .post([CommentValidation, ValidateMovieInBody], CommentController.createComment);

router.route('/comments/:id')
  .get([IntegerValidation, ValidateMovieParams], CommentController.getCommentByMovie);

router.route('/movies/:id/characters')
  .get([IntegerValidation, ValidateMovieCharacters], CharacterController.getCharactersByMovie);

export default router;
