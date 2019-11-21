import Validator from 'validatorjs';
import { ErrorRxx } from '../helpers/handlers';
import CacheStorage from '../cache';
import axios from 'axios';

const newUrl = `https://swapi.co/api/films`;

/**
 * @name CommentValidation
 * @param {object} req
 * @param {object} res
 * @returns {function} next
 * @returns {function} next
 * @returns {object} error
 * @description Validates Comment Request fields
 */
const CommentValidation = (request, response, next) => {
  const payload = request.body;
  const rules = {
    comment: ['required', 'string', 'max:500'],
    episode_id: ['required', 'integer']
  };
  const validator = new Validator(payload, rules);
  const errors = validator.errors.all();
  if (validator.fails()) return ErrorRxx(response, 400, 'failure', errors);
  return next();
};

/**
 * @name IntegerValidation
 * @param {object} req
 * @param {object} res
 * @returns {function} next
 * @returns {function} next
 * @returns {object} error
 * @description Validates Integer Param in request fields
 */
const IntegerValidation = (request, response, next) => {
  const payload = {
    id: request.params.id,
  };
  const rules = {
    id: 'required|integer',
  };
  const validator = new Validator(payload, rules);
  const errors = validator.errors.all();
  if (validator.fails()) return ErrorRxx(response, 400, 'failure', errors);
  return next();
};

/**
 * @name MovieValidation
 * @param {object} req
 * @param {object} res
 * @returns {function} next
 * @returns {function} next
 * @returns {object} error
 * @description Validates Movie id Param in request fields
 */
const ValidateMovie = async (request, response, next) => {
  try {
    const { episode_id } = request.body;
    const { data } = await axios.get(`${newUrl}/${episode_id}`);
    if(data) return next()
  } catch (error) {
    return ErrorRxx(response, 404, 'Failure', 'The movie you try to comment on does not exist')
  }
}

/**
 * @name MovieValidation
 * @param {object} req
 * @param {object} res
 * @returns {function} next
 * @returns {function} next
 * @returns {object} error
 * @description Validates Movie id Param in request fields
 */
const ValidateMovieCharacters = async (request, response, next) => {
  try {
    const { id } = request.params;
    const { data } = await axios.get(`${newUrl}/${id}`);
    if(data) return next()
  } catch (error) {
    return ErrorRxx(response, 404, 'Failure', 'The movie you try to get characters for does not exist')
  }
}

export {
  CommentValidation, IntegerValidation, ValidateMovie, ValidateMovieCharacters
};
