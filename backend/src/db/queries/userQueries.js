const db = require('../../configs/db.config');

const getAllUsers = async () => {
	try {
    const data = await db.query("SELECT * FROM users;");
    return data.rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const getUserById = async id => {
	try {
    const data = await db.query("SELECT * FROM users WHERE id = $1;", [id]);
    return data.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const createUser = async (firstName, lastName, username, email, profileUrl, profileDescription, passwordHash) => {
	try {
    const data = await db.query(
      "INSERT INTO users (first_name, last_name, username, email, profile_url, profile_description, password_hash) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;",
      [firstName, lastName, username, email, profileUrl, profileDescription, passwordHash]
    );
    return data.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const updateUserProfile = async (id, profileUrl, profileDescription) => {
	try {
    const data = await db.query(
      "UPDATE users SET profile_url = $1, profile_description = $2 WHERE id = $3 RETURNING *;",
      [profileUrl, profileDescription, id]
    );
    return data.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = {getAllUsers, getUserById, createUser, updateUserProfile };