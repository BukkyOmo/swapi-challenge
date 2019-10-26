/* istanbul ignore file */
import { Pool } from 'pg';
import dotenv from 'dotenv';
import logger from './winston';

dotenv.config();

const config = {
  development: process.env.DATABASE_URL,
  test: process.env.TEST_DATABASE_URL,
  production: process.env.PRODUCTION_URL,
};
const env = process.env.NODE_ENV;

const pool = new Pool({
  connectionString: config[env],
});

pool.on('connect', () => {
  logger.debug('connected to the db');
});

export default pool;
