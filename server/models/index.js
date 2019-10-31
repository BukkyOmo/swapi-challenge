export const createUser = 'INSERT INTO users (firstName, lastName, email, password) VALUES($1, $2, $3, $4) RETURNING *';
export const getUser = 'SELECT * FROM users WHERE email = $1';
export const getUserById = 'SELECT * FROM users WHERE id = $1';
export const createComment = 'INSERT into comments (comment, movie_id, user_id, ip_address) VALUES ($1, $2, $3, $4) returning *';
export const getCommentByMovie = 'SELECT * FROM comments WHERE movie_id = $1';
