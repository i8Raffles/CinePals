const router = require("express").Router();
module.exports = db => {
  // router.get("/users", (request, response) => {
  //   db.query(`
  //     SELECT 
  //     users.id,
  //     users.first_name,
  //     users.last_name,
  //     users.email,
  //     users.profile_url,
  //     users.profile_description,
  //     users.password_hash,
  //     users.last_modified_at
  //     FROM users
  //   `).then(({ rows:users }) => {
  //     response.json(users);
  //   });
  // });

  // GET all users
  router.get("/users", async (request, response) => {
    try {
      const users = await db.query("SELECT id, first_name, last_name, email, profile_url, profile_description, password_hash, last_modified_at FROM users;");
      response.json(users.rows);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: "An error occurred." });
    }
  });
  
  // GET user by id
  router.get("/users/:id", async (request, response) => {
    const { id } = request.params;
    try {
      const user = await db.query("SELECT * FROM users WHERE id = $1;", [id]);
      if (user.rows.length === 0) {
        response.status(404).json({ error: "User not found." });
      } else {
        response.json(user.rows[0]);
      }
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: "An error occurred." });
    }
  });

  // POST new user into database
  router.post("/users", async (request, response) => {
    const {
      firstName,
      lastName,
      username,
      email,
      profileUrl,
      profileDescription,
      passwordHash
    } = request.body;
    try {
      const createdUser = await db.query(
        "INSERT INTO users (first_name, last_name, username, email, profile_url, profile_description, password_hash) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;",
        [firstName, lastName, username, email, profileUrl, profileDescription, passwordHash]
      );
      response.status(201).json(createdUser.rows[0]);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: "An error occurred." });
    }
  });

  // UPDATE existing user details(profile picture url and profile description)
  router.put("/users/:id", async (request, response) => {
    const { id } = request.params;
    const { profileUrl, profileDescription } = request.body;
    try {
      const updatedUser = await db.query(
        "UPDATE users SET profile_url = $1, profile_description = $2 WHERE id = $3 RETURNING *;",
        [profileUrl, profileDescription, id]
      );
      if (updatedUser.rows.length === 0) {
        response.status(404).json({ error: "User not found." });
      } else {
        response.json(updatedUser.rows[0]);
      }
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: "An error occurred." });
    }
  });


  return router;
};