let envs = () => {
  if (!process.env.API_PORT) {
  	console.error('env API_PORT is empty!');
  	process.exit(1);
  }

  if (!process.env.FETCH_RECIPE_URL) {
  	console.error('env FETCH_RECIPE_URL is empty!');
  	process.exit(1);
  }

  if (!process.env.FETCH_GIPHY_URL) {
  	console.error('env FETCH_GIPHY_URL is empty!');
  	process.exit(1);
  }

  if (!process.env.GIPHY_API_KEY) {
  	console.error('env GIPHY_API_KEY is empty!');
  	process.exit(1);
  }
 
  return {
  	apiPort: process.env.API_PORT,
    fetchGiphyUrl: process.env.FETCH_GIPHY_URL,
    fetchRecipeUrl: process.env.FETCH_RECIPE_URL,
    giphyApiKey: process.env.GIPHY_API_KEY
  }  
}

module.exports = envs();