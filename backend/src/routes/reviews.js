const router = require("express").Router();
const axios = require('axios');
const config = require('../config');
module.exports = db => {
  router.get("/reviews", (request, response) => {
    db.query(`
      SELECT 
      reviews.id,
      reviews.movie_id,
      reviews.rating,
      reviews.review,
      reviews.created_at,
      reviews.user_id
      FROM reviews
    `).then(({ rows:reviews }) => {
      response.json(reviews);
    });
  });

  //Get reviews by movie_id
  router.get("/reviews/:movieId", (request, response) => {
    const movieId = request.params.movieId;
    db.query(`
      SELECT 
      reviews.id,
      reviews.movie_id,
      reviews.rating,
      reviews.review,
      reviews.created_at,
      reviews.user_id,
      users.username
      FROM reviews
      JOIN users ON users.id = reviews.user_id
      WHERE movie_id = $1;
    `,[movieId]).then(({ rows:reviews }) => {
      response.json(reviews);
      console.log(reviews);
    });
  });

    //Get reviews by movie_id && user_id
    router.get("/reviews/:movieId/:userId", (request, response) => {
      const movieId = request.params.movieId;
      const userId = request.params.userId;
      db.query(`
        SELECT 
        reviews.id,
        reviews.movie_id,
        reviews.rating,
        reviews.review,
        reviews.created_at,
        reviews.user_id
        FROM reviews
        WHERE movie_id = $1 AND user_Id = $2;
      `,[movieId, userId]).then(({ rows:reviews }) => {
        response.json(reviews);
        console.log("reviews in get reviews by movieid and userid ", reviews);
      });
    });

  //get reviews and movies by userId
  router.get("/myreviews/:userId", (request, response) => {
    const userId = request.params.userId;
    db.query(`
      SELECT 
      reviews.id,
      reviews.movie_id,
      reviews.rating,
      reviews.review,
      reviews.created_at,
      reviews.user_id,
      movies.title,
      movies.original_title,
      movies.overview,
      movies.poster_path,
      movies.vote_average,
      movies.release_date,
      users.profile_url,
      users.username
      FROM reviews 
      LEFT JOIN movies ON movies.movie_id = reviews.movie_id
      LEFT JOIN users ON users.id = reviews.user_id
      WHERE reviews.user_id = $1;
    `, [userId]).then(({ rows:reviews }) => {
      response.json(reviews);
    });
  });

  //Update review by reviewId
  router.patch("/myreviews/:reviewId", (request, response) => {
    const reviewId = request.params.reviewId;
    const { updatedReview,updatedRating }  = request.body;
    db.query(`
      UPDATE reviews
      SET review = $1, rating = $2 
      WHERE id = $3
    `,[updatedReview, updatedRating * 2.0, reviewId]).then(() => {
      response.sendStatus(200); 
    })
    .catch((error) => {
      console.error(error);
      response.sendStatus(500); 
    });
 
  });

  //Add review by movie_id & user_id && add movie to movies table
  router.post("/reviews/:movieId/:userId", async (request, response) => {
    const movieId = request.params.movieId;
    const userId = request.params.userId
    const { newReview,newRating }  = request.body;
    console.log("add review: ", movieId, userId, newRating, newReview);

    try {
      // Fetch movie details from the external API
      const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/movie/${movieId}`,
        params: {
          language: 'en-US'
        },
        headers: {
          accept: config.api.accept,
          Authorization: config.api.authorization
        }
      };
      const movieResponse = await axios.request(options);
      const movieDetails = movieResponse.data;
      //Save the movie detail to movies table
      db.query(
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
  
      // Save the review to the reviews table
      const result = await db.query(
        `
        INSERT INTO reviews (movie_id, rating, review, user_id)
        VALUES ($1, $2, $3, $4)
        RETURNING *,
        (SELECT username FROM users WHERE id = $4) as username;
      `,
        [movieId, newRating * 2.0, newReview, userId]
      );
      const insertedReview = result.rows[0]; 
      response.status(200).json(insertedReview); 
    } catch (error) {
      console.error(error);
      response.sendStatus(500);
    }
 
  });

  return router;
};