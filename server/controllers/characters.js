import axios from 'axios';
import CacheStorage from '../cache';
import { ErrorRxx, Response2xx, Response4xx } from './../helpers/handlers';

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
            const characterRedisKey = 'characters';
            const characters = await CacheStorage.fetch(characterRedisKey);
            if(characters) return Response2xx(response, 200, 'Success', 'Characters successfully retrieved from cache', characters);  
            const result = await axios.get(url);
            const { data } = result;
            await CacheStorage.save(characterRedisKey, data)
            return Response2xx(response, 200, 'success', 'Characters successfully retrieved', data);
        } catch (error) {
            return error;
        }
    }
}

export default CharacterController;