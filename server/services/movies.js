import axios from 'axios';
import MovieHelper from '../helpers/helpers';
import CacheStorage from '../cache';
import { Response2xx, ErrorRxx, ResponseHandler } from '../helpers/handlers';

const newUrl = `https://swapi.co/api/films`;
const { getAllMovies } = MovieHelper;
class MovieServices{
    /**
     *@description- Movie services
     *
     * @static{object} object
     * @param {object} request
     * @param {object} response
     * returns {object}
     * @memberof MovieServices
     */
    static async getAllMoviesService(request, response){
        try {      
            const movieRedisKey = 'all';
            const value =  await CacheStorage.fetch(movieRedisKey);
            if(value) return Response2xx(response, 200, 'Success', 'Movies successfully retrieved from Cache', value);
            const result = await axios.get(newUrl);
            const { data: { results } } = result;
            const movies = await getAllMovies(results);
            await CacheStorage.save(movieRedisKey, movies);
            return movies;
        } catch (error) {
            return error;
        }
    }

    static async getAmovieService(id){
        
    }

}

export default MovieServices;
