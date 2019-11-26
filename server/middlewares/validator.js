import Validator from 'validatorjs';
import { ErrorRxx } from '../helpers/handlers';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const { baseURL } = process.env;

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
const ValidateMovieInBody = async (request, response, next) => {
  try {
    const { episode_id } = request.body;
    const  { data } = await axios.get(`${baseURL}/films/${episode_id}`);
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
const ValidateMovieParams = async (request, response, next) => {
  try {
    const { id } = request.params;
    const  { data } = await axios.get(`${baseURL}/films/${id}`);
    if(data) return next()
  } catch (error) {
    return ErrorRxx(response, 404, 'Failure', 'This movie whose comments you try to retrieve does not exist');
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
    const { data } = await axios.get(`${baseURL}/films/${id}`);
    if(data) {
      request.body = {
        data
      };
      return next()
    }
  } catch (error) {
    return ErrorRxx(response, 404, 'Failure', 'The movie you try to get characters for does not exist')
  }
}

export {
  CommentValidation, IntegerValidation, ValidateMovieInBody, ValidateMovieCharacters, ValidateMovieParams
};
