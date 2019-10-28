import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();
const { secret } = process.env;

/**
 * Hash password
 * @param {string} password
 * @returns {string} hashedPassword
 */
const salt = bcrypt.genSaltSync(10);
const hashPassword = password => bcrypt.hashSync(password, salt);

/**
 * Compare password
 * @param {string} password
 * @returns {string} Boolean
 */
const comparePassword = (password, hash) => bcrypt.compareSync(password, hash);

/**
 * Gnerate Token
 * @param {string} payload
 * @returns {string} token
 */
const encodeToken = (payload) => {
  try{
    const token = jwt.sign(payload, secret, {expiresIn: '2d'});
    return token;
  } catch (error) {
    return error;
  }
};

export { hashPassword, comparePassword, encodeToken};


