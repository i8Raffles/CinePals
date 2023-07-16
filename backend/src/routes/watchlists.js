const { request, response } = require("express");
const router = require("express").Router();
const config = require('../config');
const axios = require('axios');

module.exports = db => {
  router.get("/watchlists/:userId", (request, response) =>{
    const userId = request.params.userId;
    db.query(`
    SELECT *
    FROM movies
    WHERE movie_id IN 
      (
      SELECT movie_id
      FROM watchlists
      WHERE user_id = $1
      )
    `,[userId]).then(({rows: watchlists }) => {
      response.json(watchlists);
    });
  });

  // Get watchlist by movieId and userId
  router.get("/watchlists/:movieId/:userId", (request, response) =>{
    const movieId = request.params.movieId;
    const userId = request.params.userId;
    db.query(`
    SELECT *
    FROM watchlists
    WHERE user_id = $1 AND movie_id = $2
    `, [userId, movieId])
      .then((result) => {
        const watchlist = result.rows[0];
          response.json(watchlist);
          console.log("Found watchlist:", watchlist);
      })

  });

  // DELETE route for deleting a movie from watchlists
  router.delete("/watchlists/:userId/:movieId", (request, response) => {
    const userId = request.params.userId;
    const movieId = request.params.movieId;
    console.log("movieId = ", movieId);
    
    db.query("DELETE FROM watchlists WHERE user_id = $1 AND  movie_id= $2", [userId, movieId])
      .then(() => {
        console.log("delete movieId", movieId, "by userId:", userId);
        console.log("delete successfully!");
        response.sendStatus(200); 
      })
      .catch((error) => {
        console.error(error);
        response.sendStatus(500); 
      });
  });

  // Adding new movie to the watchlist table
  router.post("/watchlists/:movieId/:userId", async (req, res) => {
    const movieId = req.params.movieId;
    const userId = req.params.userId;
    console.log("in watchlist adding movie, the movieId is ", movieId, " userId : ", userId);
  
    try {
      // Check if the movie already exists in the watchlist for the user
      const existingWatchlist = await db.query(
        "SELECT * FROM watchlists WHERE movie_id = $1 AND user_id = $2",
        [movieId, userId]
      );
  
      if (existingWatchlist.rows.length > 0) {
        // Movie already exists in the watchlist, return a 409 Conflict response
        return res.status(409).json({ message: "Movie already in watchlist" });
      }
      // Fetch movie details from the external API
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${movieId}`,
      params: {
        language: "en-US"
      },
      headers: {
        accept: config.api.accept,
        Authorization: config.api.authorization
      }
    };
    const movieResponse = await axios.request(options);
    const movieDetails = movieResponse.data;

    // Save the movie details to the movies table
    await db.query(
      `
      INSERT INTO movies (movie_id, original_title, title, overview, poster_path, vote_average, release_date)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      ON CONFLICT (movie_id) DO NOTHING
    `,
      [
        movieDetails.id,
        movieDetails.original_title,
        movieDetails.title,
        movieDetails.overview,
        movieDetails.poster_path,
        movieDetails.vote_average,
        movieDetails.release_date
      ]
    );

    // Add the movie to the watchlist
    await db.query("INSERT INTO watchlists (movie_id, user_id) VALUES ($1, $2)", [movieId, userId]);

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
  });

  return router;
};