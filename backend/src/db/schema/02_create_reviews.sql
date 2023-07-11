DROP TABLE IF EXISTS reviews;

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY NOT NULL,
  movie_id INTEGER NOT NULL,
  rating DECIMAL(3, 1),
  review TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,  
  UNIQUE (user_id, movie_id)
);
