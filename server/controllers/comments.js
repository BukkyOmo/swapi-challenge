import { ErrorRxx, Response2xx } from '../helpers/handlers';
import CommentModel from '../models/comment';

class CommentsController {
    /**
     *@description- An endpoint to create a comment
     *
     * @static{object} object
     * @param {object} request
     * @param {object} response
     * returns {object}
     * @memberof MovieController
     */
    static async createComment(request, response) {
        const { comment, movie_id } = request.body;
        const { id } = request.user;
        const { ip } = request;
        const commentQuery = new CommentModel({comment, movie_id, id, ip});
        if(!await commentQuery.createComment()) return ErrorRxx(response, 500, 'failure', 'Unable to save comment in database, please try again');
        return Response2xx(response, 201, 'success', 'Comment successfully saved', commentQuery.result);
    }
}

export default CommentsController;