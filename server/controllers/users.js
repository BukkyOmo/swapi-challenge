import { ErrorRxx, Response2xx, Response4xx } from '../helpers/handlers';
import { encodeToken } from '../helpers/auth';
import UserModel from '../models/user';

class UserController {
  /**
	 *@description- An endpoint to create a user account
	 *
	 * @static{object} object
	 * @param {object} request
	 * @param {object} response
	 * returns {object}
	 * @memberof UserController
	 */
  static async signupUser(request, response){
    const newUser = new UserModel(request.body);
    if(await newUser.getUser() && newUser.rowCount > 0) return ErrorRxx(response, 409, 'failure', 'Email already in use');
    if(!await newUser.createUser()) return ErrorRxx(response, 500, 'failure', 'Your details could not be saved, please try again.');
    const user = newUser.result;
    const token = await encodeToken({id: user.id, email: user.email});
    const result = {token, user};
    return Response2xx(response, 201, 'success', 'User successfully registered', result);
  }
}

export default UserController;
