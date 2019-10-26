import db from '../../config/database';

/**
 * @name ForeignKey
 * @returns {array}
 * @description Add foreign keys to tables on database
 */
const ForeignKey = async () => {
  const client = await db.connect();
  try{
    const query = `ALTER TABLE comments ADD FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;`;
    await client.query(query);
  }catch(error){
    throw error;
  } finally {
    client.release()
  }
}
export default ForeignKey;
