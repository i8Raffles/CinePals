const { request, response } = require("express");
const axios = require('axios');
const router = require("express").Router();
const config = require('../config');

module.exports = db => {
  // router.get("/watchlists", (request, response) =>{
  //   db.query(`
  //     SELECT movie_id
  //     FROM watchlists
  //   `).then(({rows: watchlists }) => {
  //     response.json(watchlists);
  //   });
  // });

  //GET all watchlists
  router.get("/watchlists", async (request, response) => {
    try {
      const watchlists = await db.query("SELECT movie_id FROM watchlists;");
      response.json(watchlists.rows);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: "An error occurred." });
    }
  });

  // GET watchlist by user ID
  router.get("/users/:userId/watchlists", (request, response) => {
    const { userId } = request.params;
  
    db.query(`
      SELECT *
      FROM movies
      WHERE movie_id IN (
        SELECT movie_id
        FROM watchlists
        WHERE user_id = $1
      )
    `, [userId]).then(({ rows: watchlists }) => {
      response.json(watchlists);
    });
  });

  // POST new movie to watchlist
  router.post("/watchlists", async (request, response) => {
    const { movieId, userId } = request.body;
    try {
      const createdWatchlistItem = await db.query(
        "INSERT INTO watchlists (movie_id, user_id) VALUES ($1, $2) RETURNING *;",
        [movieId, userId]
      );
      response.status(201).json(createdWatchlistItem.rows[0]);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: "An error occurred." });
    }
  });

  // POST add a movie to the watchlist and save to database???
  router.post('/users/:userId/watchlist/movies/:movieId', async (req, res) => {
    // Extract the necessary data from the request body
    const { movieId, userId } = req.params;

    const options = {
      method: 'GET',
      url: `https://api.themoviedb.org/3/movie/${movieId}`,
      params: {
        language: 'en-US',
      },
      headers: {
        accept: config.api.accept,
        Authorization: config.api.authorization,
      },
    };

    try {
      const movieResponse = await axios.request(options);

      // Extract the relevant information from the API response
      const { id, original_title, title, overview, poster_path, vote_average, release_date } = movieResponse.data;

      // Prepend the base URL to the poster path
      const fullPosterPath = `https://image.tmdb.org/t/p/w300${poster_path}`;

      // Save the extracted information to the database
      const savedWatchlist = await db.query(
        'INSERT INTO watchlist (user_id, movie_id) VALUES ($1, $2) RETURNING *',
        [userId, movieId]
      );

      const savedMovie = await db.query(
        'INSERT INTO movies (movie_id, original_title, title, overview, poster_path, vote_average, release_date) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [id, original_title, title, overview, fullPosterPath, vote_average, release_date]
      );

      res.status(201).json({ watchlist: savedWatchlist.rows[0], movie: savedMovie.rows[0] });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred.' });
    }
  });

  // DELETE watchlist movie
  router.delete('/users/:userId/watchlist/:movieId', async (req, res) => {
    const { userId, movieId } = req.params;
  
    try {
      await db.query(
        'DELETE FROM watchlists WHERE user_id = $1 AND movie_id = $2',
        [userId, movieId]
      );
      res.sendStatus(204);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred.' });
    }
  });

  return router;
};