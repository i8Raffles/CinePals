const router = require("express").Router();
module.exports = db => {
  router.get("/users", (request, response) => {
    db.query(`
      SELECT 
      users.id,
      users.first_name,
      users.last_name,
      users.username,
      users.email,
      users.profile_url,
      users.profile_description,
      users.password_hash,
      users.last_modified_at
      FROM users
    `).then(({ rows:users }) => {
      response.json(users);
    });
  });

  router.get("/users/:userId", (request, response) => {
    const userId = request.params.userId;
    db.query(`
      SELECT 
      users.id,
      users.first_name,
      users.last_name,
      users.username,
      users.email,
      users.profile_url,
      users.profile_description,
      users.password_hash,
      users.last_modified_at
      FROM users
      WHERE users.id = $1
    `,[userId]).then(({ rows}) => {
        if (rows.length === 0) {
          
          response.sendStatus(404);
        } else {
          const user = rows[0];
          response.json(user);
        }
    }).catch((error) => {
      console.error(error);
      response.sendStatus(500); 
    });
  });

  router.patch("/users/:userId", (request, response) => {
    const userId = request.params.userId;
    const { description, avatarUrl } = request.body;
    db.query(`
      UPDATE users
      SET profile_description = $1, profile_url = $2
      WHERE id = $3
    `,[description, avatarUrl, userId]).then(() => {
      response.sendStatus(200); // Sending a success status code if the update is successful
    })
    .catch((error) => {
      console.error(error);
      response.sendStatus(500); // Sending an error status code if an error occurs during the update
    });
  });

  return router;
};