import { ErrorRxx, Response2xx } from '../helpers/handlers';
import CommentService from '../services/comments';

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
        try {
            const { ip } = request;
            const commentQuery = new CommentService({comment, episode_id, ip});
            const isSaved = await commentQuery.createComment()
            
            if(!isSaved) return ErrorRxx(response, 500, 'failure', 'Unable to save comment in database, please try again');
            return Response2xx(response, 201, 'success', 'Comment successfully saved', commentQuery.result);
        } catch (error) {
            return error;
        }
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
        if(!await newQuery.getCommentByMovie()) return ErrorRxx(response, 500, 'failure', 'Unable to get comment from database, please try again'); 
        const data = newQuery.result;
        data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        return Response2xx(response, 200, 'Success', 'Comment retrieved succcessfully', data);
    }
}

export default CommentsController;