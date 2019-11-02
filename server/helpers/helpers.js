class MovieHelper{
    static async getAllMovies(values){
        const movies = [];
        values.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
        values.forEach(item => {
            movies.push({
              title: item.title,
              opening_crawls: item.opening_crawl,
              release_date: item.release_date,
            })
        });
        return movies;
    }
};

export default MovieHelper;