const express = require('express');
const router = new express.Router();
const giphyService = require('../services/giphy-service');
const recipeService = require('../services/recipe-service');

router.get('/', (req, res) => {
  let ingredients;
  try {
    ingredients = req.query.i ? req.query.i.split(',') : [];

    if (!ingredients.length || ingredients.length > 3) {
      console.log('invalid amount of ingredients: ' + ingredients.length);
      res.status(400).send('Bad Request');
      return;
    }
  } catch (e) {
    console.error('fails attempting get ingredients: ', e);
    res.status(400).send('Bad Request');
  }

  ingredients.sort();

  recipeService.fetchRecipes(ingredients)
    .then((results) => {
      const promises = [];
      results.map((r) => {
        const i = r.ingredients.split(',');
        const treated = {
          title: r.title,
          ingredients: i.map((item) => item.trim()).sort(),
          link: r.href,
        };
        promises.push(giphyService.fetchGif(treated));
      });
      return Promise.all(promises);
    }).then((recipeList) => {
      const r = {
        keywords: ingredients,
        recipes: recipeList,
      };
      res.send(r);
    })
    .catch((error) => {
      let msg = 'fails attempting get recipes!';
      if (error.statusCode >= 500) {
        msg = 'recipe service is unavailable!';
      }

      const status = error.statusCode ? error.statusCode : 500;

      console.error(msg, error);
      res.status(status).send(msg);
      return;
    });
});

module.exports = router;
