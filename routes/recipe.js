const express = require('express');
const router = express.Router();
const rp = require('request-promise');

const fetchRecipeUrl = process.env.FETCH_RECIPE_URL;
const fetchGiphyUrl = process.env.FETCH_GIPHY_URL;
const giphyApiKey = process.env.GIPHY_API_KEY;

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
  const targetRecipe = fetchRecipeUrl + '?i=' + ingredients;

  rp(targetRecipe)
      .then((response) => {
    	return JSON.parse(response).results;
      })
  	.then((results) => {
  	  const promises = [];
  	  results.map((r) => {
  	  	const i = r.ingredients.split(',');
  	  	const treated = {
  	  	  title: r.title,
       	  ingredients: i,
       	  link: r.href,
       	};
  	  	promises.push(fetchGifs(treated));
  	  });
  	  return promises;
  	}).then((promises) => {
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

  		console.error('fails attempting get recipes: ', error.statusCode);
  		res.status(error.statusCode).send(msg);
  		return;
  	});
});

fetchGifs = (result) => {
  const targetGiphy = 'http://' + fetchGiphyUrl + '?api_key=' + giphyApiKey + '&tag=' + result.title;
  return rp(targetGiphy)
      .then((gif) => {
        const url = JSON.parse(gif).data.url;
  	  result.gif = url;
  	  return result;
      });
};

module.exports = router;
