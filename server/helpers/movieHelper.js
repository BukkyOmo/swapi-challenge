/* istanbul ignore file */
import db from '../../config/database';
import { getCommentByMovie } from '../queries';

class MovieHelper{
    static async getCommentCount(episode_id){
        try {          
            const { rowCount } = await db.query(getCommentByMovie, [episode_id]);
            const commentRowCount = rowCount ? rowCount : 0;
            return commentRowCount;
        } catch (error) {
            return error;
        }
    }

    static async getMoviesHelper(values){
        try {
               values.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
               const movies = values.map(async movie => {
                   return {
                        episode_id: movie.episode_id,
                        title: movie.title,
                        opening_crawls: movie.opening_crawl,
                        release_date: movie.release_date,
                        comment_count: await MovieHelper.getCommentCount(movie.episode_id)
                   }
               });
            return await Promise.all(movies); 
        } catch (error) {
            return error;
        }
    }
};

export default MovieHelper;
