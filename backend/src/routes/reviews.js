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
    const { updatedReview }  = request.body;
    db.query(`
      UPDATE reviews
      SET review = $1
      WHERE id = $2
    `,[updatedReview, reviewId]).then(() => {
      response.sendStatus(200); 
    })
    .catch((error) => {
      console.error(error);
      response.sendStatus(500); 
    });
  });

  return router;
};