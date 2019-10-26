import db from '../../config/database';

/**
 * @name User
 * @returns {array}
 * @description Create User table on database
 */
const User = async () => {
  const client = await db.connect();
  try {
    const query = `CREATE TABLE IF NOT EXISTS users(
      id SERIAL UNIQUE,
      firstName VARCHAR(255) NOT NULL,
      lastName VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW(),
      PRIMARY KEY(id, email)
    );`;
    await client.query(query);
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
};
export default User;
