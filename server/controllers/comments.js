import { ErrorRxx, Response2xx, Response4xx } from '../helpers/handlers';
import CommentModel from '../models/comment';

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
        const { comment, movie_id } = request.body;
        const { id } = request.user;
        const { ip } = request;
        const commentQuery = new CommentModel({comment, movie_id, id, ip});
        if(!await commentQuery.createComment()) return ErrorRxx(response, 500, 'failure', 'Unable to save comment in database, please try again');
        return Response2xx(response, 201, 'success', 'Comment successfully saved', commentQuery.result);
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
        const newQuery = new CommentModel(request.params);
        if(await newQuery.getCommentByMovie() && newQuery.count === 0) return ErrorRxx(response, 404, 'Failure', 'There are no comments for this movie yet');
        if(!await newQuery.getCommentByMovie()) return ErrorRxx(response, 500, 'failure', 'Unable to get comment from database, please try again'); 
        const data = newQuery.result;
        data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        return Response2xx(response, 200, 'Success', 'Comment retrieved succcessfully', data);
    }
}

export default CommentsController;