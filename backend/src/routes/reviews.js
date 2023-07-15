const router = require("express").Router();
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

  //Add review by movie_id & user_id
  router.post("/reviews/:movieId/:userId", (request, response) => {
    const movieId = request.params.movieId;
    const userId = request.params.userId
    const { newReview,newRating }  = request.body;
    console.log("add review: ", movieId, userId, newRating, newReview);
    db.query(`
      INSERT INTO reviews (movie_id, rating, review, user_id)
      VALUES ($1, $2, $3, $4)
    `,[movieId, newRating * 2.0, newReview, userId]).then(() => {
      response.sendStatus(200); 
    })
    .catch((error) => {
      console.error(error);
      response.sendStatus(500); 
    });
 
  });

  return router;
};