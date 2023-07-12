const router = require("express").Router();

module.exports = db => {
  
  // GET all followers
  router.get("/followers", async (request, response) => {
    try {
      const followers = await db.query("SELECT * FROM followers;");
      response.json(followers.rows);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: "An error occurred." });
    }
  });

  // GET followers by user ID
  router.get("/followers/user/:userId", async (request, response) => {
    const { userId } = request.params;
    try {
      const followers = await db.query("SELECT * FROM followers WHERE user_id = $1;", [userId]);
      response.json(followers.rows);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: "An error occurred." });
    }
  });

  // GET users following a specific user
  router.get("/followers/following/:userId", async (request, response) => {
    const { userId } = request.params;
    try {
      const following = await db.query("SELECT * FROM followers WHERE following_id = $1;", [userId]);
      response.json(following.rows);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: "An error occurred." });
    }
  });

  // POST new follower
  router.post("/followers", async (request, response) => {
    const { userId, followingId } = request.body;
    try {
      const createdFollower = await db.query(
        "INSERT INTO followers (user_id, following_id, follow_state) VALUES ($1, $2, $3) RETURNING *;",
        [userId, followingId, true]
      );
      response.status(201).json(createdFollower.rows[0]);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: "An error occurred." });
    }
  });

  // DELETE follower
  router.delete("/followers/:id", async (request, response) => {
    const { id } = request.params;
    try {
      const deletedFollower = await db.query("DELETE FROM followers WHERE id = $1 RETURNING *;", [id]);
      if (deletedFollower.rows.length === 0) {
        response.status(404).json({ error: "Follower not found." });
      } else {
        response.json({ message: "Follower deleted successfully." });
      }
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: "An error occurred." });
    }
  });

  return router;
};