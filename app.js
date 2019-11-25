const express = require('express');
const app = express();
const recipeRoute = require('./routes/recipe');
const env = require('./conf/env');

app.use('/recipes', recipeRoute);

app.listen(env.apiPort, () => {
  console.log('running at: ' + env.apiPort);
});

module.exports = app;
