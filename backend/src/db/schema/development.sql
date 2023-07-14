INSERT INTO users (first_name, last_name, username, email, profile_url, profile_description, password_hash)
VALUES
  ('John', 'Doe', 'johndoe', 'johndoe@example.com', 'https://dbdzm869oupei.cloudfront.net/img/t-shirts/preview/59199.png', 'Profile description for John Doe', '$2b$10$9rXyFpq9A7Qd0klv7AZZi.6lBGGKFyT5D9cCY8GQ0F8zca4OGVo4m'),
  ('Jane', 'Smith', 'janesmith', 'janesmith@example.com', 'https://st.depositphotos.com/1005549/1553/v/450/depositphotos_15530783-stock-illustration-white-kitty.jpg', 'Profile description for Jane Smith', '$2b$10$9rXyFpq9A7Qd0klv7AZZi.6lBGGKFyT5D9cCY8GQ0F8zca4OGVo4m'),
  ('Cindy', 'Wilson', 'cindywilson', 'cindywilson@example.com', 'https://cdn.pixabay.com/photo/2021/02/11/16/20/cat-6005844_1280.png', 'Profile description for Cindy Wilson', '$2b$10$9rXyFpq9A7Qd0klv7AZZi.6lBGGKFyT5D9cCY8GQ0F8zca4OGVo4m'),
  ('Taylor', 'Swift', 'taylorswift', 'taylorswift@example.com', 'https://cdn.vectorstock.com/i/preview-1x/94/40/cute-cat-vector-19469440.jpg', 'Profile description for Taylor Swift', '$2b$10$9rXyFpq9A7Qd0klv7AZZi.6lBGGKFyT5D9cCY8GQ0F8zca4OGVo4m');

  INSERT INTO movies (movie_id, original_title, title, overview, poster_path, vote_average, release_date)
VALUES
  (455476, 'Knights of the Zodiac', 'Knights of the Zodiac', 'When a headstrong street orphan, Seiya, in search of his abducted sister unwittingly taps into hidden powers, he discovers he might be the only person alive who can protect a reincarnated goddess, sent to watch over humanity. Can he let his past go and embrace his destiny to become a Knight of the Zodiac?', '/tBiUXvCqz34GDeuY7jK14QQdtat.jpg', 6.5, '2023-04-27'),
  (385687, 'Fast X', 'Fast X', 'Over many missions and against impossible odds, Dom Toretto and his family have outsmarted, out-nerved and outdriven every foe in their path. Now, they confront the most lethal opponent they have ever faced: A terrifying threat emerging from the shadows of the past who is fueled by blood revenge, and who is determined to shatter this family and destroy everything—and everyone—that Dom loves, forever.', '/yvr1Ziehgps1VJyug8nnezTJRJW.jpg', 7.358, '2023-05-17'),
  (254128, 'San Andreas', 'San Andreas', 'In the aftermath of a massive earthquake in California, a rescue-chopper pilot makes a dangerous journey across the state in order to rescue his estranged daughter.', '/2Gfjn962aaFSD6eST6QU3oLDZTo.jpg', 6.213, '2015-05-27'),
  (447365, 'Guardians of the Galaxy Vol. 3', 'Guardians of the Galaxy Vol. 3', 'Peter Quill, still reeling from the loss of Gamora, must rally his team around him to defend the universe along with protecting one of their own. A mission that, if not completed successfully, could quite possibly lead to the end of the Guardians as we know them.', '/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg', 8.152, '2023-05-03');

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

INSERT INTO followers (user_id, following_id, follow_state)
VALUES
  (1, 2, true),
  (1, 3, true),
  (1, 4, true),
  (2, 3, true),
  (4, 1, true),
  (3, 2, true);
