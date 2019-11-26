import express from 'express';
import tryCatch from '../helpers/errorHandler';
import { CommentValidation, IntegerValidation, ValidateMovieInBody, ValidateMovieCharacters, ValidateMovieParams } from '../middlewares/validator';
import MovieController from '../controllers/movies';
import CommentController from '../controllers/comments';
import CharacterController from '../controllers/characters';

const router = express.Router();

router.route('/movies')
  .get(tryCatch(MovieController.getAllMovies));

router.route('/comments')
  .post([CommentValidation, ValidateMovieInBody], tryCatch(CommentController.createComment));

router.route('/comments/:id')
  .get([IntegerValidation, ValidateMovieParams], tryCatch(CommentController.getCommentByMovie));

router.route('/movies/:id/characters')
  .get([IntegerValidation, ValidateMovieCharacters], tryCatch(CharacterController.getCharactersByMovie));

export default router;
