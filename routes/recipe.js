const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {

  let ingredients = req.query.i ? req.query.i.split(',') : 0;
  
  if (!ingredients || ingredients.length > 3) {
  	console.log('invalid amount of ingredients: ' + ingredients.length);
  	res.status(400).send('Bad Request');
  	return;
  }

  res.send('OK');
});

module.exports = router;