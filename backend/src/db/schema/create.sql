DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS watchlists;
DROP TABLE IF EXISTS followers;
DROP TABLE IF EXISTS movies;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  profile_url VARCHAR(255),
  profile_description TEXT,
  password_hash VARCHAR(255) NOT NULL,
  last_modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

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

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY NOT NULL,
  movie_id INTEGER REFERENCES movies(movie_id) ON DELETE CASCADE,
  rating DECIMAL(3, 1),
  review TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,  
  last_modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (user_id, movie_id)
);

CREATE TABLE watchlists (
  id SERIAL PRIMARY KEY NOT NULL,
  movie_id INTEGER REFERENCES movies(movie_id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE (user_id, movie_id)
);

CREATE TABLE followers (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  following_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  follow_state BOOLEAN NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (user_id, following_id)
);