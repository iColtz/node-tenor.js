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
   */
  search(query) {
    return this._fetch(`https://api.tenor.com/v1/search?key=${this.key}&q=${query}`);
  }
}

module.exports = TenorClient;