INSERT INTO users (first_name, last_name, username, email, profile_url, profile_description, password_hash)
VALUES
  ('John', 'Doe', 'johndoe', 'johndoe@example.com', 'https://example.com/johndoe', 'Profile description for John Doe', '$2b$10$9rXyFpq9A7Qd0klv7AZZi.6lBGGKFyT5D9cCY8GQ0F8zca4OGVo4m'),
  ('Jane', 'Smith', 'janesmith', 'janesmith@example.com', 'https://example.com/janesmith', 'Profile description for Jane Smith', '$2b$10$9rXyFpq9A7Qd0klv7AZZi.6lBGGKFyT5D9cCY8GQ0F8zca4OGVo4m'),
  ('Cindy', 'Wilson', 'cindywilson', 'cindywilson@example.com', 'https://example.com/cindywilson', 'Profile description for Cindy Wilson', '$2b$10$9rXyFpq9A7Qd0klv7AZZi.6lBGGKFyT5D9cCY8GQ0F8zca4OGVo4m'),
  ('Taylor', 'Swift', 'taylorswift', 'taylorswift@example.com', 'https://example.com/taylorswift', 'Profile description for Taylor Swift', '$2b$10$9rXyFpq9A7Qd0klv7AZZi.6lBGGKFyT5D9cCY8GQ0F8zca4OGVo4m');

  INSERT INTO reviews (movie_id, rating, review, user_id)
VALUES
  (455476, 8.4, 'Great movie!', 1),
  (385687, 7.4, 'Excellent film!', 2),
  (447365, 9.3, 'Highly recommended.', 1),
  (254128, 6.5, 'Average movie by Jane!', 2),
  (455476, 9.0, 'Highly recommended by Cindy!', 3),
  (447365, 6.9, 'Average movie by Cindy!', 3),
  (455476, 8.7, 'Highly recommended by Taylor!', 4),
  (254128, 8.8, 'Highly recommended by Taylor!', 4);

INSERT INTO watchlists (movie_id, user_id)
VALUES
  (455476, 1),
  (385687, 2),
  (447365, 1),
  (254128, 1),
  (254128, 2),
  (254128, 3),
  (254128, 4),
  (385687, 3);

INSERT INTO followers (user_id, following_id)
VALUES
  (1, 2),
  (1, 3),
  (1, 4),
  (2, 3),
  (4, 1),
  (3, 2);
