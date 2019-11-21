export const createComment = 'INSERT into comments (comment, episode_id, ip_address) VALUES ($1, $2, $3) returning *';
export const getCommentByMovie = 'SELECT * FROM comments WHERE episode_id = $1';
