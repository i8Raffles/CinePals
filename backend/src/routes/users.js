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

  //Update user's profile by userId
  router.patch("/users/:userId", (request, response) => {
    const userId = request.params.userId;
    const { description, avatarUrl } = request.body;
    db.query(`
      UPDATE users
      SET profile_description = $1, profile_url = $2
      WHERE id = $3
    `,[description, avatarUrl, userId]).then(() => {
      response.sendStatus(200); 
    })
    .catch((error) => {
      console.error(error);
      response.sendStatus(500); 
    });
  });

  //Get following users by userId
  router.get("/follows/:userId", (request, response) => {
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
      users.last_modified_at,
      followers.user_id
    FROM users
    INNER JOIN followers ON users.id = followers.following_id
    WHERE
      followers.follow_state = TRUE
      AND followers.user_id =  $1
    `,[userId]).then(({ rows:follows }) => {
      response.json(follows);
    });
  });

  //Update unfollow info by following_id and user_id
  router.patch("/follows/:userId/:followId", (request, response) => {
    const userId = request.params.userId;
    const followId = request.params.followId;
    db.query(`
      UPDATE followers
      SET follow_state = FALSE
      WHERE followers.user_id = $1 
      AND followers.following_id = $2
    `,[userId, followId]).then(() => {
      response.sendStatus(200); 
    })
    .catch((error) => {
      console.error(error);
      response.sendStatus(500); 
    });
  });

  return router;
};