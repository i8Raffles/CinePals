const axios = require('axios');
const express = require('express');
const config = require('../config');

const router = express.Router();

router.get('/movies_popular/:page', async (req, res) => {
  const { page } = req.params;

  const options = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/movie/popular',
    params: {
      language: 'en-US',
      page: page
    },
    headers: {
      accept: config.api.accept,
      Authorization: config.api.authorization
    }
  };

  try {
    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});


router.get('/movies_now_playing/:page', async (req, res) => {
  const { page } = req.params;

  const options = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/movie/now_playing',
    params: {
      language: 'en-US',
      page: page
    },
    headers: {
      accept: config.api.accept,
      Authorization: config.api.authorization
    }
  };

  try {
    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

router.get('/movies_top_rated/:page', async (req, res) => {
  const { page } = req.params;

  const options = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/movie/top_rated',
    params: {
      language: 'en-US',
      page: page
    },
    headers: {
      accept: config.api.accept,
      Authorization: config.api.authorization
    }
  };

  try {
    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

router.get('/movies_upcoming/:page', async (req, res) => {
  const { page } = req.params;

  const options = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/movie/upcoming',
    params: {
      language: 'en-US',
      page: page
    },
    headers: {
      accept: config.api.accept,
      Authorization: config.api.authorization
    }
  };

  try {
    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

router.get('/movie_details/:movieId', async (req, res) => {
  const { movieId } = req.params;
  console.log("movie_id in api fetch ", movieId);
  const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/movie/${movieId}`,
    params: {
      language: 'en-US'
    },
    headers: {
      accept: config.api.accept,
      Authorization: config.api.authorization
    }
  };
  const options2= {
    method: 'GET',
    url: `https://api.themoviedb.org/3/movie/${movieId}/videos`,
    params: {
      language: 'en-US'
    },
    headers: {
      accept: config.api.accept,
      Authorization: config.api.authorization
    }
  };
  
  try {
    const [response, trailerResponse] = await Promise.all([
      axios.request(options),
      axios.request(options2)
    ]);

    const movieData = response.data;
    const trailerData = trailerResponse.data;
    // console.log("trailerData ", trailerData.results);
    
    const officialTrailer = trailerData.results.find(trailer => trailer.name === "Official Trailer");
    // const trailerKey = officialTrailer.key;

    // If "Official Trailer" is not found, try to find any other trailer
    const trailer = officialTrailer || trailerData.results.find((trailer) => trailer.type === "Teaser");

// If a trailer is found, get its key
const trailerKey = trailer ? trailer.key : null;

    // Combine the movie details and trailer data into a single object
    const movieDetailsWithTrailer = {
      ...movieData,
      trailer: trailerKey
    };

    res.json(movieDetailsWithTrailer);
    // console.log("API fetch - movie details with the official trailer:", movieDetailsWithTrailer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});


router.get('/movies_by_genres/:genre/:page', async (req, res) => {
  const { genre, page } = req.params;

  const options = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/discover/movie',
    params: {
      include_adult: false,
      include_video: false,
      language: 'en-US',
      page: page,
      sort_by: 'popularity.desc',
      with_genres: genre
    },
    headers: {
      accept: config.api.accept,
      Authorization: config.api.authorization
    }
  };

  try {
    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});


module.exports = router;
