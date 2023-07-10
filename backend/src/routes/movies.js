const router = require("express").Router();
module.exports = db => {
  router.get("/movies", (request, response) => {
    db.query(`
      SELECT 
      movies.id,
      movies.movie_id,
      movies.title,
      movies.original_title,
      movies.overview,
      movies.poster_path,
      movies.vote_average,
      movies.release_date
      FROM movies
    `).then(({ rows:movies }) => {
      response.json(movies);
    });
  });

  return router;
};