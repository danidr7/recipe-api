const express = require('express');
const app = express();
const recipeRoute = require('./routes/recipe');

app.use('/recipes', recipeRoute);

app.listen(process.env.API_PORT, () => {
  console.log('running at: ' + process.env.API_PORT);
});

module.exports = app;
