import axios from 'axios';
import CharacterHelper from '../helpers/characterHelper'
import { Response2xx } from './../helpers/handlers';
import CacheStorage from '../cache';

class CharacterController{
        /**
     *@description- An endpoint to get all characters from a specific movie
     *
     * @static{object} object
     * @param {object} request
     * @param {object} response
     * returns {object}
     * @memberof CharacterController
     */

    static async getCharactersByMovie(request, response){
        const { id } = request.params;
        const { query } = request;
        try {  
            const charactersRedisKey = id;
            const value =  await CacheStorage.fetch(charactersRedisKey);

            if(value) {
                const cachedResult = await CharacterHelper.calcAndFilterValues(value, query);
                return Response2xx(response, 200, 'Success', 'Movies characters successfully retrieved', cachedResult);       
            }
            
            const url = 'https://swapi.co/api/films';
            const result = await axios.get(`${url}/${id}`);
            const { data: { characters } } = result;
            const allCharacters = characters.map(async characterUrl => (await axios.get(characterUrl)).data);
            const resultCharacters = await Promise.all(allCharacters);

            await CacheStorage.save(charactersRedisKey, resultCharacters);
            const Result = await CharacterHelper.calcAndFilterValues(resultCharacters, query);          
            if(result) return Response2xx(response, 200, 'Success', 'Movie characters successfully retrieved', Result);
        } catch (error) {
           return error; 
        }
    }
}

export default CharacterController;
