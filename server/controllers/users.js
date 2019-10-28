import { ErrorRxx, Response2xx, Response4xx } from '../helpers/handlers';
import { encodeToken, comparePassword } from '../helpers/auth';
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
  };

    /**
	 *@description- An endpoint to sign in a registered user
	 *
	 * @static{object} object
	 * @param {object} request
	 * @param {object} response
	 * returns {object}
	 * @memberof UserController
	 */
  static async signinUser(request, response){
    const existingUser = new UserModel(request.body);
    if(await existingUser.getUser() && existingUser.rowCount === 0) return ErrorRxx(response, 404, 'failure', 'please register');
    const user = existingUser.result;
    const confirmPassword = comparePassword(request.body.password, user.password);
    if(!confirmPassword) return ErrorRxx(response, 409, 'failure', 'Incorrect password or email')
    const token = encodeToken({id: user.id, email: user.email})
    const result = {token, user};
    Response2xx(response, 200, 'success', 'User successfully logged in', result);
  }
}

export default UserController;
