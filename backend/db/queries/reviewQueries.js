const db = require('../../configs/db.config');

const getAllReviews = async () => {
	try {
    const data = await db.query("SELECT * FROM reviews;");
    return data.rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const getReviewById = async id => {
	try {
    const data = await db.query("SELECT * FROM reviews WHERE id = $1;", [id]);
    return data.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const createReview = async (movieId, rating, review, userId) => {
	try {
    const data = await db.query(
      "INSERT INTO reviews (movie_id, rating, review, user_id) VALUES ($1, $2, $3, $4) RETURNING *;",
      [movieId, rating, review, userId]
    );
    return data.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = { getAllReviews, getReviewById, createReview }