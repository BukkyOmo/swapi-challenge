import Validator from 'validatorjs';
import { ErrorRxx } from '../helpers/handlers';

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
  CommentValidation, IntegerValidation,
};
