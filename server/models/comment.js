import db from '../../config/database';
import { createComment } from './index';

class CommentModel{
    constructor(payload = null){
        this.payload = payload;
        this.result = null;
        this.error = null
    }

    async createComment() {
        const { comment, movie_id, id, ip } = this.payload;
        const values = [comment, parseInt(movie_id), id, ip];

        try {
            const { rows } = await db.query(createComment, values); 
            this.result = rows[0];
            return true;
        } catch (error) {
            this.error = error.stack;
            return false;
        }
    }
}

export default CommentModel;