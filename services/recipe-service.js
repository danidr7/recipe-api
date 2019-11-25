const env = require('../conf/env');
const rp = require('request-promise');

module.exports = {

  fetchRecipes: (params) => {
    const targetRecipe = env.fetchRecipeUrl + '?i=' + params;

    return rp(targetRecipe)
      .then((response) => {
        return JSON.parse(response).results;
      });
  },
};
