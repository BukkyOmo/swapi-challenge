import pool from '../../config/database';

/**
 * @name Comment
 * @returns {array}
 * @description Create Comment table on database
 */
const Comment = async () => {
  const client = await pool.connect();
  try {
    const query = `CREATE TABLE IF NOT EXISTS comments(
      id SERIAL UNIQUE,
      comment TEXT NOT NULL,
      movie_id INTEGER NOT NULL,
      ip_address VARCHAR(255) NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      PRIMARY KEY(id)
    );`;
    await client.query(query);
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
};
export default Comment;
