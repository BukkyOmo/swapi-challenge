/* istanbul ignore file */
import axios from 'axios';
import { ErrorRxx, Response2xx, Response4xx } from '../helpers/handlers';
import CacheStorage from '../cache';

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
        const movies = [];
        const movieRedisKey = 'all';
        const value =  await CacheStorage.fetch(movieRedisKey);

        if(value) return Response2xx(response, 200, 'Success', 'Movies successfully retrieved from Cache', value);
        const result = await axios.get(newUrl);
        const { data: { results } } = result;
        results.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
        results.forEach(item => {
            movies.push({
              title: item.title,
              opening_crawl: item.opening_crawl,
              release_date: item.release_date,
            })
        });
        await CacheStorage.save(movieRedisKey, movies);
        return Response2xx(response, 200, 'success', 'Movies successfully retrieved', movies);
        } catch (error) {
          return error;
        }
      }

    /**
     *@description- An endpoint to get all movies
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
        return error;
      }
  };
};

export default MovieController;
