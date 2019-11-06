import db from '../../config/database';
import { createComment, getCommentByMovie } from './index';

class CommentModel{
    constructor(payload = null){
        this.payload = payload;
        this.result = null;
        this.count = null;
        this.error = null
    }

    async createComment() {
        const { comment, movie_id, ip } = this.payload;
        const values = [comment, parseInt(movie_id), ip];
        try {
            const { rows } = await db.query(createComment, values);
            this.result = rows[0];
            return true;
        } catch (error) {
            this.error = error.stack;
            return false;
        }
    }

    async getCommentByMovie() {
        const { id } = this.payload;
        const values = [id];
        try {
            const { rows, rowCount } = await db.query(getCommentByMovie, values);
            this.result = rows;
            this.count = rowCount;
            return true;
        } catch (error) {
            this.error = error.stack;
        }
    }
}

export default CommentModel;