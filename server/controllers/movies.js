/* istanbul ignore file */
import axios from 'axios';
import { ErrorRxx, Response2xx } from '../helpers/handlers';
import CacheStorage from '../cache';
import MovieHelper from '../helpers/movieHelper';

const { getMoviesHelper } = MovieHelper;

const newUrl = `https://swapi.co/api/films`;

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
        try {
            const movieRedisKey = 'all';
            const values =  await CacheStorage.fetch(movieRedisKey);
            if(values) return Response2xx(response, 200, 'Success', 'Movies successfully retrieved', values);
            const result = await axios.get(newUrl);
            const { data: { results } } = result;
            const movies = await getMoviesHelper(results);
            await CacheStorage.save(movieRedisKey, movies);
            return Response2xx(response, 200, 'success', 'Movies successfully retrieved', movies);
        } catch (error) {
          return error;
        }
      };
};

export default MovieController;
