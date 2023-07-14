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

  
  //Add follow info by following_id and user_id
  router.post("/addfollows/:userId/:followId", (request, response) => {
    const userId = request.params.userId;
    const followId = request.params.followId;
    
    db.query(
      `SELECT COUNT(*) FROM followers WHERE user_id = $1 AND following_id = $2`,
      [userId, followId]
    ).then((result) => {
        const rowCount = result.rows[0].count;
        if (rowCount === 0) {
          // No row exists, so add a new row
          db.query(
            `INSERT INTO followers (user_id, following_id, follow_state)
             VALUES ($1, $2, TRUE)`,
            [userId, followId]
          ).then(() => {
              response.sendStatus(200);
            })
          .catch((error) => {
              console.error(error);
              response.sendStatus(500);
            });
        } else {
          // Row exists, so update follow_state to true
          db.query(
            `UPDATE followers SET follow_state = TRUE
             WHERE user_id = $1 AND following_id = $2`,
            [userId, followId]
          ).then(() => {
            response.sendStatus(200);
            })
          .catch((error) => {
              console.error(error);
              response.sendStatus(500);
            });
        }
      })
      .catch((error) => {
        console.error(error);
        response.sendStatus(500);
      });
  });

  //Check follow_state
  router.get("/checkfollow/:userId/:followId", (request, response) => {
    const userId = request.params.userId;
    const followId = request.params.followId;
    // Query the database to check the follow status
    db.query(
      `SELECT follow_state FROM followers WHERE user_id = $1 AND following_id = $2`,[userId, followId]
    )
    .then((result) => {
      if (result.rows.length > 0) {
        const isFollowed = result.rows[0].follow_state;
        response.json({ isFollowed });
      } else {
        response.json({ isFollowed: false });
      }
    })
    .catch((error) => {
      console.error("Error checking follow status:", error);
      response.sendStatus(500);
    });
  });

  return router;
};