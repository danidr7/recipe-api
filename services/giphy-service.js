const env = require('../conf/env');
const rp = require('request-promise');

module.exports = {
  fetchGif: (result) => {
    const targetGiphy = env.fetchGiphyUrl + '?api_key=' +
    env.giphyApiKey + '&tag=' + result.title;

    return rp(targetGiphy)
      .then((gif) => {
        const url = JSON.parse(gif).data.url;
        result.gif = url;
        return result;
      });
  },
};
