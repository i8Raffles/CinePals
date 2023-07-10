const { request, response } = require("express");

const router = require("express").Router();

module.exports = db => {
  router.get("/watchlists", (request, response) =>{
    db.query(`
      SELECT movie_id
      FROM watchlists
    `).then(({rows: watchlists }) => {
      response.json(watchlists);
    });
  });

  return router;
};