const db = require('../../configs/db.config');

const getAllWatchlists = async () => {
  try {
    const data = await db.query("SELECT * FROM watchlists;");
    return data.rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getWatchlistById = async id => {
  try {
    const data = await db.query("SELECT * FROM watchlists WHERE id = $1;", [id]);
    return data.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getWatchlistMoviesByUserId = async userId => {
  try {
    const data = await db.query("SELECT movie_id FROM watchlists WHERE user_id = $1;", [userId]);
    return data.rows.map(row => row.movie_id);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const createWatchlist = async (movieId, userId) => {
	try {
    const data = await db.query(
      "INSERT INTO watchlists (movie_id, user_id) VALUES ($1, $2) RETURNING *;",
      [movieId, userId]
    );
    return data.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = { getAllWatchlists, getWatchlistById, getWatchlistMoviesByUserId, createWatchlist };