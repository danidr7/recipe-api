const express = require('express');
const router = new express.Router();
const giphyService = require('../services/giphy-service');
const recipeService = require('../services/recipe-service');

router.get('/', async (req, res) => {
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
    return;
  }

  try {
    ingredients.sort();
    const results = await recipeService.fetchRecipes(ingredients);
    if (!results) {
      res.status(404).send('no one recipe was found');
      return;
    }

    const promises = results.map(async (r) => {
      const g = await giphyService.fetchGif(r.title);
      const ing = r.ingredients.split(',');

      return {
        title: r.title,
        ingredients: ing.map((item) => item.trim()).sort(),
        link: r.href,
        gif: g,
      };
    });

    treated = await Promise.all(promises);

    const resr = {
      keywords: ingredients,
      recipes: treated,
    };

    res.status(200).send(resr);
  } catch (error) {
    console.log(error)
    res.status(500).send('internal error');
  }
});

module.exports = router;
