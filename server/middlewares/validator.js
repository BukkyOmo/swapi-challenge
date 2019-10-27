import Validator from 'validatorjs';
import { ErrorRxx } from '../helpers/handlers';

const stringValidation = 'regex:/^([a-zA-Z0-9,.!? @_-]+)$/';
const nameValidation = 'regex:/^([a-zA-Z ]{3,20})$/';

/**
 * @name UserValidation
 * @param {object} req
 * @param {object} res
 * @returns {function} next
 * @returns {function} next
 * @returns {object} error
 * @description Validates User Request fields
 */
const UserValidation = (request, response, next) => {
  const payload = request.body;
   let rules = {
    firstName: ['required', nameValidation, 'string', 'min:3', 'max:20'],
    lastName: ['required', nameValidation, 'string', 'min:3', 'max:20'],
    email: ['required', 'email'],
    password: ['required', stringValidation, 'min:7', 'max:30'],
  };
  if (request.originalUrl === '/api/v1/auth/signin') {
    rules = {
      email: ['required', 'email'],
      password: ['required', stringValidation, 'min:7', 'max:30'],
    };
  }
  const validator = new Validator(payload, rules);
  const errors = validator.errors.all();
  if (validator.fails()) return ErrorRxx(response, 400, 'failure', errors);
  return next();
};

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
    comment: ['required', 'string'],
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

export {
  UserValidation, CommentValidation, IntegerValidation,
};
