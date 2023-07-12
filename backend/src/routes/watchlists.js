const { request, response } = require("express");

const router = require("express").Router();

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
      const watchlists = await db.query("SELECT * FROM watchlists;");
      response.json(watchlists.rows);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: "An error occurred." });
    }
  });

  // GET watchlist by user ID
  router.get("/watchlists/user/:userId", async (request, response) => {
    const { userId } = request.params;
    try {
      const watchlist = await db.query("SELECT * FROM watchlists WHERE user_id = $1;", [userId]);
      response.json(watchlist.rows);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: "An error occurred." });
    }
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

  // DELETE watchlist movie
  router.delete("/watchlists/:id", async (request, response) => {
    const { id } = request.params;
    try {
      const deletedWatchlistItem = await db.query("DELETE FROM watchlists WHERE id = $1 RETURNING *;", [id]);
      if (deletedWatchlistItem.rows.length === 0) {
        response.status(404).json({ error: "Watchlist item not found." });
      } else {
        response.json({ message: "Watchlist item deleted successfully." });
      }
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: "An error occurred." });
    }
  });

  return router;
};