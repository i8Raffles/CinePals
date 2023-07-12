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

router.get('/movie_details/:movie_id', async (req, res) => {
  const { movie_id } = req.params;

  const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/movie/${movie_id}`,
    params: {
      language: 'en-US'
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
