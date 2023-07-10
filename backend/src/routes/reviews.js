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

  return router;
};