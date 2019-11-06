import db from '../../config/database';

/**
 * @name DropAllTables
 * @description Remove all tables
 */
const DropAllTables = async () => {
  const client = await db.connect();
  try {
    const dropTables = 'DROP TABLE IF EXISTS comments';
    await client.query(dropTables);
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
};

export default DropAllTables;
