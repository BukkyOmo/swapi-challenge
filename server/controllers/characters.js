import axios from 'axios';
import CacheStorage from '../cache';
import CharacterHelper from '../helpers/characterHelper'
import { ErrorRxx, Response2xx } from './../helpers/handlers';

class CharacterController{
        /**
     *@description- An endpoint to get all characters
     *
     * @static{object} object
     * @param {object} request
     * @param {object} response
     * returns {object}
     * @memberof CharacterController
     */
    static async getCharacters(request, response) {
        try {          
            const url = 'https://swapi.co/api/people';
            const result = await axios.get(url);
            const { data } = result;
            const { results } = data;
            const newHelper = new CharacterHelper(request);
            const values = await newHelper.sortFunction(results);
            return Response2xx(response, 200, 'success', 'Characters successfully retrieved', values);
        } catch (error) {
            return error;
        }
    }
}

export default CharacterController;