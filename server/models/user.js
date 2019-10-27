import { hashPassword } from '../helpers/auth'
import { createUser, getUser } from './index';
import db from '../../config/database';

class User {
  constructor(payload) {
    this.payload = payload,
    this.result = null,
    this.error = null
  }

  async createUser(){
    const { firstName, lastName, email, password } = this.payload;
    const values = [firstName, lastName, email, hashPassword(password)];

    try {
      const { rows } = await db.query(createUser, values);
      this.result = rows[0];
      return true;
    }
    catch(error){
      this.error = error.stack;
      return false;
    }
  }

  async getUser(){
    const { email } = this.payload;

    try {
      const { rows, rowCount } = await db.query(getUser, [email]);
      this.result = rows[0];
      this.rowCount = rowCount;
      return true;
    } catch (error) {
      this.error = error.stack;
      return false;
    }
  }
}

export default User;
