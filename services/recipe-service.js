const env = require('../conf/env');
const axios = require('axios');

module.exports = {

  fetchRecipes: async (params) => {
    const targetRecipe = env.fetchRecipeUrl + '?i=' + params;
    try {
      const response = await axios.get(targetRecipe);
      return response.data.results;
    } catch (error) {
      console.log(error);
    }
  },

};
