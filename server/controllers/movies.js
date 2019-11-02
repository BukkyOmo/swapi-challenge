/* istanbul ignore file */
import axios from 'axios';
import { ErrorRxx, Response2xx, Response4xx } from '../helpers/handlers';
import CacheStorage from '../cache';
import MovieHelper from '../helpers/helpers';

const { getAllMovies } = MovieHelper;

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
        const value =  await CacheStorage.fetch(movieRedisKey);
        if(value) return Response2xx(response, 200, 'Success', 'Movies successfully', value);
        const result = await axios.get(newUrl);
        const { data: { results } } = result;
        const movies = await getAllMovies(results);
        await CacheStorage.save(movieRedisKey, movies);
        return Response2xx(response, 200, 'success', 'Movies successfully retrieved', movies);
        } catch (error) {
          return error;
        }
      };

    /**
     *@description- An endpoint to get a movie
     *
     * @static{object} object
     * @param {object} request
     * @param {object} response
     * returns {object}
     * @memberof MovieController
     */
    static async getAMovie(request, response){
      const { id } = request.params;
      try {
       const value =  await CacheStorage.fetch(id);
       if(value) Response2xx(response, 200, 'Success', 'Successfully retrieved', value);

       const result = await axios.get(`${newUrl}/${id}`);
       const { data } = result;
       await CacheStorage.save(id, data);
       return Response2xx(response, 200, 'Success', 'Successfully retrieved', data);
      } catch (error) {
        if(error.response.status === 404) {
          return ErrorRxx(response, 404, 'Failure', 'Movie not found')
        }     
        return error;
      }
  };
};

export default MovieController;
