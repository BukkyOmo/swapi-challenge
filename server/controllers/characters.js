import axios from 'axios';
import CharacterHelper from '../helpers/characterHelper'
import { ErrorRxx, Response2xx } from './../helpers/handlers';
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

        const { data: { characters } } = request.body;
        const charactersRedisKey = id;
        const value =  await CacheStorage.fetch(charactersRedisKey);

        if (value) {
            const cachedResult = await CharacterHelper.calcAndFilterValues(value, query);
            if(!cachedResult.results.length) return ErrorRxx(response, 404, 'Failure', 'There are no characters with these qualities in this movie')    
            return Response2xx(response, 200, 'Success', 'Movies characters successfully retrieved', cachedResult);       
        }
        
        const allCharacters = characters.map(async characterUrl => (await axios.get(characterUrl)).data);
        const resultCharacters = await Promise.all(allCharacters);

        await CacheStorage.save(charactersRedisKey, resultCharacters);
        const Result = await CharacterHelper.calcAndFilterValues(resultCharacters, query);  
        if (!Result.results.length) return ErrorRxx(response, 404, 'Failure', 'There are no characters with these qualities in this movie')    
        return Response2xx(response, 200, 'Success', 'Movie characters successfully retrieved', Result);
    }
}

export default CharacterController;
