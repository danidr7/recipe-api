const express = require('express');
const router = new express.Router();
const giphyService = require('../services/giphy-service');
const recipeService = require('../services/recipe-service');

router.get('/', async (req, res, next) => {
  let ingredients;

  try {
    ingredients = req.query.i ? req.query.i.split(',') : [];

    if (!ingredients.length || ingredients.length > 3) {
      const err = 'invalid amount of ingredients: ' + ingredients.length;
      console.log(err);
      status = 400;
      res.status(status).send({
        title: err,
        status: status,
        detail: 'you should send 1 to 3 ingredients',
      });
      return;
    }

    ingredients.sort();
    const results = await recipeService.fetchRecipes(ingredients);
    if (!results) {
      const err = 'no one recipe was found';
      console.log(err);
      status = 400;
      res.status(status).send({
        title: err,
        status: status,
        detail: 'your ingredients match no recipe, try a different combination',
      });
      return;
    }

    // This way, with promises, increase performance a lot
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

    const treated = await Promise.all(promises);

    const resr = {
      keywords: ingredients,
      recipes: treated,
    };

    res.status(200).send(resr);
  } catch (e) {
    const err = 'fails attempting get ingredients: '+ e;
    console.log(err);
    status = 500;
    res.status(status).send({
      title: 'something wrong happened. Please, try again later',
      status: status,
    });
    return;
  }
});

module.exports = router;
