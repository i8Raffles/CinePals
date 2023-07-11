const router = require("express").Router();
module.exports = db => {
  router.get("/users", (request, response) => {
    db.query(`
      SELECT 
      users.id,
      users.first_name,
      users.last_name,
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

  return router;
};