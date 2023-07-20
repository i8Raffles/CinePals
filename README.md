# CinePals

CinePals is an application that allows you to browse movies at your leisure. We really wanted users to be able to review movies and to follow other users who have similar tastes in movies(or not!) and get solid recommendations on what movies to watch next. To learn more keep scrolling down to setup and get started with using CinePals!

## Screenshots

![Home Page](https://github.com/i8Raffles/final_project/blob/master/docs/home-page.PNG?raw=true)
![Home Page - Genres](https://github.com/i8Raffles/final_project/blob/master/docs/genres.PNG?raw=true)
![Movie Details](https://github.com/i8Raffles/final_project/blob/master/docs/movie-details.PNG?raw=true)
![Search Feature](https://github.com/i8Raffles/final_project/blob/master/docs/search-feature.PNG?raw=true)
![My Profile](https://github.com/i8Raffles/final_project/blob/master/docs/my-profile.PNG?raw=true)
![My Movies](https://github.com/i8Raffles/final_project/blob/master/docs/my-movielist.PNG?raw=true)
![My Reviews](https://github.com/i8Raffles/final_project/blob/master/docs/my-reviews.PNG?raw=true)
![My Follows](https://github.com/i8Raffles/final_project/blob/master/docs/my-follows.PNG?raw=true)
![Home Page(animation genre) - Light Mode](https://github.com/i8Raffles/final_project/blob/master/docs/home-page-lightmode.PNG?raw=true)


## Getting Started

- Firstly you need to download PostgreSQL if you don't already have it from `https://www.postgresql.org/download/`.

- From the project directory, type `psql` to launch it and log in.

- From within psql run `CREATE DATABASE movieapp_development;` to create the database for our application

- Now to setup the database run `npm run reset`, which will create the tables and also add some initial data to it.

- From a separate terminal do `npm install` in both the frontend and backend directories.

- There may be a small issue installing a certain package on the frontend directory, if that happens you can use `npm i @mui/styles --force` to hopefully resolve that problem.

- In backend directory, create .env and copy .env.example into it.  

- Make sure your psql is running and you are connected to the database and you should be ready to go!

### Backend

From the project directory:
- `cd backend/`
- `npm start`

### Frontend

From the project directory:
- `cd frontend/`
- `npm start`


### Using CinePals

- You can click the top right user icon to register and/or login as a user
- On the homepage, you can see a list of movies(by default set to popular) and browse by top-rated, upcoming or a variety of genres.
- You can keep scrolling down to dynamically continue rendering more movies for each category.
- There is a search bar on the top right as well where you can type a movie name, click enter and view various movies under those search parameters.
- Clicking on a movie takes you to the movie details page where you can see more information about the movie including watching a trailer/teaser for that movie; if you are logged in, you can add that movie to your watchlist(this can be done from the home page as well!) and leave a review and/or rating on that movie.
- If you are logged in, the top right user icon will have a drop down menu allowing you to navigate to your profile, movies, reviews and following pages.
- On your profile page, you can add a URL to update your avatar icon and also a small description about you.
- On your My Movies page, you can view a list of all the movies you've added to your watchlist and also remove any should you choose to.
- On your My Reviews page, you can see all the reviews and ratings you've given for movies and edit them if want to.
- From the Movie details page, if other users have left reviews, you can click on any of their profile icons to go to their profile page and follow them. Once you do so, your My Follows page will be updated with those profile names and clicking that will allow you to check out each of those users movie list and reviews.


### Tech Stack

- React
- Express
- PostgreSQL


### Dependencies 

#### Frontend
    "@emotion/react": "^11.11.1",
    "@emotion/styled": "^11.11.0",
    "@mui/icons-material": "^5.13.7",
    "@mui/material": "^5.14.0",
    "@mui/styles": "^5.14.0",
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "axios": "^1.4.0",
    "date-fns": "^2.30.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router": "^6.14.1",
    "react-router-dom": "^6.14.1",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4"

#### Backend
    "axios": "^1.4.0",
    "bcrypt": "^5.1.0",
    "body-parser": "^1.20.2",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "helmet": "^7.0.0",
    "morgan": "^1.10.0",
    "node-fetch": "^3.3.1",
    "pg": "^8.11.1"