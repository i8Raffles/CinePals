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