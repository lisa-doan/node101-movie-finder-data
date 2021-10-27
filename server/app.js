const express = require("express");
const morgan = require("morgan");
const axios = require("axios");

let app = express();

// When making calls to the OMDB API make sure to append the '&apikey=8730e0e' parameter

app.use(morgan("dev"));

let cache = {};

app.use(morgan("dev"));

app.get("/", function (req, res) {
  if (!cache[req.url]) {
    axios
      .get("http://www.omdbapi.com" + req.url + "&apikey=8730e0e")
      .then(function (response) {
        cache[req.url] = response.data;
        res.json(response.data);
      })
      .catch(function (error) {
        res.status(500).send({ error: "Internal Server Error" });
      });
  } else {
    res.json(cache[req.url]);
  }
});

module.exports = app;
