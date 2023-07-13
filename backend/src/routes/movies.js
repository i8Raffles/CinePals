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

  // GET all movies
  router.get("/movies", async (request, response) => {
    try {
      const movies = await db.query("SELECT * FROM movies;");
      response.json(movies.rows);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: "An error occurred." });
    }
  });

  // GET movie by ID(PK)
  router.get("/movies/:id", async (request, response) => {
    const { id } = request.params;
    try {
      const movie = await db.query("SELECT * FROM movies WHERE id = $1;", [id]);
      if (movie.rows.length === 0) {
        response.status(404).json({ error: "Movie not found." });
      } else {
        response.json(movie.rows[0]);
      }
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: "An error occurred." });
    }
  });

   // GET movie by movie_id(id from API)
   router.get("/movies/:movieId", async (request, response) => {
    const { movieId } = request.params;
    try {
      const movie = await db.query("SELECT * FROM movies WHERE movie_id = $1;", [movieId]);
      if (movie.rows.length === 0) {
        response.status(404).json({ error: "Movie not found." });
      } else {
        response.json(movie.rows[0]);
      }
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: "An error occurred." });
    }
  });

  // POST new movie
  router.post("/movies", async (request, response) => {
    const { movieId, originalTitle, title, overview, posterPath, voteAverage, releaseDate } = request.body;
    try {
      const createdMovie = await db.query(
        "INSERT INTO movies (movie_id, original_title, title, overview, poster_path, vote_average, release_date) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;",
        [movieId, originalTitle, title, overview, posterPath, voteAverage, releaseDate]
      );
      response.status(201).json(createdMovie.rows[0]);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: "An error occurred." });
    }
  });

  return router;
};