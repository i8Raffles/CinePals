const router = require('express').Router();

router.get('/', (req, res) => {
  const movies = ['Star Wars', 'Spiderman', 'Warcraft', 'James Bond'];
  res.json(movies);
});
  

module.exports = router;