const db = require('../../configs/db.config');

const getAllFollowers = async () => {
	try {
    const data = await db.query("SELECT * FROM followers;");
    return data.rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const getFollowerById = async id => {
	try {
    const data = await db.query("SELECT * FROM followers WHERE id = $1;", [id]);
    return data.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const createFollower = async (userId, followingId) => {
	try {
    const data = await db.query(
      "INSERT INTO followers (user_id, following_id) VALUES ($1, $2) RETURNING *;",
      [userId, followingId]
    );
    return data.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = { getAllFollowers, getFollowerById, createFollower }