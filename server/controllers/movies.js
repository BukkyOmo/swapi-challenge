import axios from 'axios';
import redis from 'redis';

const client = redis.createClient(6379);

client.on('error', (err) => {
  console.log("Error " + err);
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
        client.get(newUrl, async (error, result) => {
          const data = JSON.parse(result);
          const { results } = data;
          results.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
          let finalData = results.filter(item => {
            console.log(item)
            return {
              title: item.title,
              crawls: item.opening_crawls
            }
          })
          if (result) {
            return response.status(200).json({
              status: 200,
              message: `Successfully retrieved`,
              finalData,
            })
          }
          const res = await axios.get(newUrl);
          const resultJSON = res.data;
          client.setex(newUrl, 3600, JSON.stringify({ source: 'Redis Cache', ...resultJSON, }));
          response.status(200).json({
              movies: resultJSON
            })
        });
        } catch (error) {
        console.log(error)
          return error;
        }
      }
}

export default MovieController;
