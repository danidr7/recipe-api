const env = require('../conf/env');
const axios = require('axios');

module.exports = {

  fetchGif: async (title) => {
    const targetGiphy = env.fetchGiphyUrl + '?api_key=' +
    env.giphyApiKey + '&tag=' + title;
    try {
      const response = await axios.get(targetGiphy);
      return response.data.data.url;
    } catch (error) {
      console.log(error);
    }
  },
};
