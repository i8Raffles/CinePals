const router = require("express").Router();
const axios = require('axios');
const config = require('../config');

module.exports = db => {
  // router.get("/reviews", (request, response) => {
  //   db.query(`
  //     SELECT 
  //     reviews.id,
  //     reviews.movie_id,
  //     reviews.rating,
  //     reviews.review,
  //     reviews.created_at,
  //     reviews.user_id
  //     FROM reviews
  //   `).then(({ rows:reviews }) => {
  //     response.json(reviews);
  //   });
  // });

  // GET all reviews
  router.get("/reviews", async (request, response) => {
    try {
      const reviews = await db.query("SELECT * FROM reviews;");
      response.json(reviews.rows);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: "An error occurred." });
    }
  });

  // GET all reviews by userId
  router.get("/reviews/user/:userId", async (request, response) => {
    const { userId } = request.params;
    try {
      const reviews = await db.query("SELECT * FROM reviews WHERE user_id = $1;", [userId]);
      response.json(reviews.rows);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: "An error occurred." });
    }
  });

  // GET review by id
  router.get("/reviews/:id", async (request, response) => {
    const { id } = request.params;
    try {
      const review = await db.query("SELECT * FROM reviews WHERE id = $1;", [id]);
      if (review.rows.length === 0) {
        response.status(404).json({ error: "Review not found." });
      } else {
        response.json(review.rows[0]);
      }
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: "An error occurred." });
    }
  });
  
  // GET reviews for a particular movie ID
  router.get("/reviews/movie/:movieId", async (request, response) => {
    const { movieId } = request.params;
    try {
      const reviews = await db.query("SELECT * FROM reviews WHERE movie_id = $1;", [movieId]);
      response.json(reviews.rows);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: "An error occurred." });
    }
  });

  // POST new review
  router.post("/reviews", async (request, response) => {
    const { movieId, rating, review, userId } = request.body;
    try {
      const createdReview = await db.query(
        "INSERT INTO reviews (movie_id, rating, review, user_id) VALUES ($1, $2, $3, $4) RETURNING *;",
        [movieId, rating, review, userId]
      );
      response.status(201).json(createdReview.rows[0]);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: "An error occurred." });
    }
  });

  // POST a new review and add movie to database???
  router.post('/reviews', async (req, res) => {
    // Extract the necessary data from the request body
    const { movieId, userId, rating, reviewText } = req.body;
  
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
      const savedReview = await db.query(
        'INSERT INTO reviews (movie_id, user_id, rating, review) VALUES ($1, $2, $3, $4) RETURNING *',
        [movieId, userId, rating, reviewText]
      );
  
      const savedMovie = await db.query(
        'INSERT INTO movies (movie_id, original_title, title, overview, poster_path, vote_average, release_date) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [id, original_title, title, overview, fullPosterPath, vote_average, release_date]
      );
  
      res.status(201).json({ review: savedReview.rows[0], movie: savedMovie.rows[0] });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred.' });
    }
  });

  // EDIT an existing review
  router.put("/reviews/:id/edit", async (request, response) => {
    const { id } = request.params;
    const { rating, review } = request.body;
    try {
      const updatedReview = await db.query(
        "UPDATE reviews SET rating = $1, review = $2, last_modified_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *;",
        [rating, review, id]
      );
      if (updatedReview.rows.length === 0) {
        response.status(404).json({ error: "Review not found." });
      } else {
        response.json(updatedReview.rows[0]);
      }
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: "An error occurred." });
    }
  });

  return router;
};