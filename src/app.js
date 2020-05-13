const express = require('express');

const app = express();
const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => res.json({
  msg: 'Welcome, Nerd!',
  about: 'Build for SDGs Team 023 Back-end',
  stack: 'NodeJS - JavaScript, MongoDB, Jest, Redis, Docker'
}));

module.exports = app;
