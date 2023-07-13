const { request, response } = require("express");

const router = require("express").Router();

module.exports = db => {
  router.get("/watchlists", (request, response) =>{
    db.query(`
    SELECT *
    FROM movies
    WHERE movie_id IN 
      (
      SELECT movie_id
      FROM watchlists
      WHERE user_id = 1
      )
    `).then(({rows: watchlists }) => {
      response.json(watchlists);
    });
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
        response.sendStatus(200); // Sending a success status code if the deletion is successful
      })
      .catch((error) => {
        console.error(error);
        response.sendStatus(500); // Sending an error status code if an error occurs during deletion
      });
  });

  return router;
};