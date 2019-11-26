import { ErrorRxx, Response2xx } from '../helpers/handlers';
import CommentService from '../services/comments';
import CacheStorage from '../cache';

class CommentsController {
    /**
     *@description- An endpoint to create a comment
     *
     * @static{object} object
     * @param {object} request
     * @param {object} response
     * returns {object}
     * @memberof CommentsController
     */
    static async createComment(request, response) {
        const { comment, episode_id } = request.body;
        const movieRedisKey = 'all';
        const { ip } = request;
        const commentQuery = new CommentService({comment, episode_id, ip});
        const isSaved = await commentQuery.createComment()     
        if(!isSaved) return ErrorRxx(response, 500, 'Failure', 'Unable to save comment in database, please try again');
        await CacheStorage.delete(movieRedisKey);
        return Response2xx(response, 201, 'Success', 'Comment successfully saved', commentQuery.result);
    }

    /**
     *@description- An endpoint to get all comment specific to a movie
     *
     * @static{object} object
     * @param {object} request
     * @param {object} response
     * returns {object}
     * @memberof CommentsController
     */
    static async getCommentByMovie(request, response) {
        const newQuery = new CommentService(request.params);        
        if(await newQuery.getCommentByMovie() && newQuery.count === 0) return ErrorRxx(response, 404, 'Failure', 'There are no comments for this movie yet');
        if(!await newQuery.getCommentByMovie()) return ErrorRxx(response, 500, 'Failure', 'Unable to get comment from database, please try again'); 
        const { result } = newQuery;
        result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        const data = {count: result.length, result}
        return Response2xx(response, 200, 'Success', 'Comment retrieved succcessfully', data);
    }
}

export default CommentsController;
