const fetch = require('node-fetch');

class TenorClient {
  /**
   * Tenor Client.
   * @param {string} key - Tenor API key.
   */
  constructor(key) {
    this.key = key;
  }

  /**
   * Fetches data from tenor's public api.
   * @param {string} path - The path to fetch from.
   */
  async _fetch(path) {
    try {
      const data = await fetch(path);
      const body = await data.json();
      return body;
    }
    catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Searchs tenor api for gifs.
   * @param {string} query - What to search for.
   * @param {number} [limit=20] - The limit of results to be fetched.
   * @param {string} [contentFilter='off'] - The content safety filter level. (Values: off | low | medium | high)
   */
  search(query, limit = 20, contentFilter = 'off') {
    return this._fetch(`https://api.tenor.com/v1/search?key=${this.key}&q=${query}&limit=${limit}&contentfilter=${contentFilter}`);
  }
}

module.exports = TenorClient;