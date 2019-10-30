/* istanbul ignore file */
import axios from 'axios';
import redis from 'redis';
import logger from '../../config/winston';

const client = redis.createClient(6379);

client.on('error', (err) => {
  logger.debug("Error " + err);
});

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
        const newUrl = `https://swapi.co/api/films`;
        let movies = [];

        client.get(newUrl, async (error, result) => {
          const data = JSON.parse(result);
          const { results } = data;
          results.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
          results.forEach(item => {
            movies.push({
              title: item.title,
              opening_crawl: item.opening_crawl,
              release_date: item.release_date,
            })
          });
          if (result) {
            return response.status(200).json({
              status: 200,
              message: `Successfully retrieved`,
              movies,
            })
          }
          const res = await axios.get(newUrl);
          const resultJSON = res.data;
          client.setex(newUrl, 3600, JSON.stringify({ source: 'Redis Cache', ...resultJSON, }));
          response.status(200).json({
              data: resultJSON
            })
        });
        } catch (error) {
          return error;
        }
      }
}

export default MovieController;
