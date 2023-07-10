DROP TABLE IF EXISTS movies;
CREATE TABLE movies (
  id SERIAL PRIMARY KEY NOT NULL,
  movie_id INTEGER NOT NULL,
  original_title VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  overview TEXT NOT NULL,
  poster_path VARCHAR(255) NOT NULL,
  vote_average DECIMAL(3, 1),
  release_date TIMESTAMP,
  UNIQUE (movie_id)
);