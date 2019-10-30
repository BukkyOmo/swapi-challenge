import jwt from 'jsonwebtoken';
import db from '../../config/database';
import { getUserById } from '../models/index';
import dotenv from 'dotenv';
import { ErrorRxx } from '../helpers/handlers';

dotenv.config();
const { secret } = process.env;
/**
 * Verify Token
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object|void} response object
 */
const VerifyToken = async (request, response, next) => {
  const { token } = request.headers;
  try {
    if(!token) return ErrorRxx(response, 401, 'failure', 'Invalid authorization, token not found');
    const decoded = await jwt.verify(token, secret);
    const { rows } = await db.query(getUserById, [decoded.id]);
    if(!rows) return ErrorRxx(response, 401, 'failure', 'The authorization token provided is invalid');
    request.user = rows[0];
    next();
  } catch (error) {
      return ErrorRxx(response, 401, 'failure', 'Invalid Authorization, token invalid!');
  }
}

export default VerifyToken;
