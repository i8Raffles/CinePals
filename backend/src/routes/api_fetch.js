const axios = require('axios');
const express = require('express');
const config = require('../config');

const router = express.Router();

// const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
// const options = {
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MzU3MzU1ODI5NzljM2FiMzk1ZDVhMzc4YmU0MmQzNiIsInN1YiI6IjY0YTc1NjM2NjVjMjZjMDEwY2U0MWEwZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.71IxAhKPttcGu3sUPrakws0_qdLVPD-ZFMPRAgKTpXM',
//   },
// };

// router.get('/fetchApi', (req, res) => {
//   axios.get(url, options)
//     .then(response => {
//       res.json(response.data);
//     })
//     .catch(error => {
//       console.error('Error fetching data:', error);
//       res.status(500).json({ error: 'Error fetching data' });
//     });
// }); 

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
