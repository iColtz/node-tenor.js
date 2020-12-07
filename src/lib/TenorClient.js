const fetch = require('node-fetch');

const API = 'https://api.tenor.com/v1/';

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
   * @param {searchOptions} - Options for the search.
   */
  search(query, options) {
    const { limit = 20, contentFilter = 'off', locale = 'en_US' } = options;
    return this._fetch(`${API}search?key=${this.key}&q=${query}&limit=${limit}&contentfilter=${contentFilter}&locale=${locale}`);
  }
}

module.exports = TenorClient;

/**
 * Tenor Client search options.
 * @typedef {Object} searchOptions
 * @property {number} [limit=20] - The limit of results to be fetched.
 * @property {string} [contentFilter='off'] - The content safety filter level. (Values: off | low | medium | high)
 * @property {string} [locale='en_US'] - Language to interpret search string
*/