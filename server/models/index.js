export const createUser = 'INSERT INTO users (firstName, lastName, email, password) VALUES($1, $2, $3, $4) RETURNING *';
export const getUser = 'SELECT * FROM users WHERE email = $1';
export const getUserById = 'SELECT * FROM users WHERE id = $1';
