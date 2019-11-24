const express = require('express');
const router = express.Router();
const request = require('request');
const fetchRecipeUrl = process.env.FETCH_RECIPE_URL;
const service = require('../services/recipe-service');

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

  ingredients.sort()
  let target = fetchRecipeUrl + '?i=' + ingredients;

  request(target, (error, response, body) => {
  	if(response.statusCode >= 500) {
  		console.error('target ' + target + ' responsed with status: ' + response.statusCode);
  		res.status(500).send('recipe service is unavailable!');
  		return;
  	}

  	if(error) {
  		console.error('target ' + target + ' responsed with error: ' + error);
  		res.status(500).send('recipe service is unavailable!');
  		return;
  	}

  	let recipes = JSON.parse(body).results;
  	let results = recipes.map((el) => {
  	  let i = el.ingredients.split(',');

      return {
      	title: el.title,
      	ingredients: i,
      	link: el.href,
      }
  	});

  	let treated = {
  		keywords: ingredients,
  		recipes: results
  	};

  	res.send(treated);
  });
});

module.exports = router;