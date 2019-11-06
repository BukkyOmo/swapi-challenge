export const createComment = 'INSERT into comments (comment, movie_id, ip_address) VALUES ($1, $2, $3) returning *';
export const getCommentByMovie = 'SELECT * FROM comments WHERE movie_id = $1';
