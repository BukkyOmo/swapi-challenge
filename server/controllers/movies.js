/* istanbul ignore file */
import axios from 'axios';
import { ErrorRxx, Response2xx } from '../helpers/handlers';
import CacheStorage from '../cache';
import MovieHelper from '../helpers/movieHelper';
import dotenv from 'dotenv';

dotenv.config();
const { baseURL } = process.env;

const { getMoviesHelper } = MovieHelper;

class MovieController {
    /**
     *@description- An endpoint to get all movies
     *
     * @static{object} object
     * @param {object} request
     * @param {object} response
     * returns {object}
     * @memberof MovieController
     */
    static async getAllMovies(request, response){
        const movieRedisKey = 'all';
        const values =  await CacheStorage.fetch(movieRedisKey);
        if(values) return Response2xx(response, 200, 'Success', 'Movies successfully retrieved', values);
        const result = await axios.get(`${baseURL}/films`);
        const { data: { results } } = result;
        const movies = await getMoviesHelper(results);
        await CacheStorage.save(movieRedisKey, movies);
        return Response2xx(response, 200, 'Success', 'Movies successfully retrieved', movies);
    };
};

export default MovieController;
