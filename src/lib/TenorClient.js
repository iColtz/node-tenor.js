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
   * Builds the search path.
   * @param {string} - The search string.
   * @param {searchOptions} - The search options.
   */
  _buildSearchPath(query, options) {
    let defaultPath = `${API}search?key=${this.key}&q=${query}`;
    const params = Object.entries(options);
    params.forEach((param) => {
      if (param[1]) {
        defaultPath += `&${param[0]}=${param[1]}`;
      }
    });
    return defaultPath;
  }

  /**
   * Builds the trending path.
   * @param {trendingOptions} - The trending options.
   */
  _buildTrendingPath(options) {
    let defaultPath = `${API}trending?key=${this.key}`;
    const params = Object.entries(options);
    params.forEach((param) => {
      if (param[1]) {
        defaultPath += `&${param[0]}=${param[1]}`;
      }
    });
    return defaultPath;
  }

  /**
   * Builds the trending path.
   * @param {trendingOptions} - The trending options.
   */
  _buildCategoriesPath(options) {
    let defaultPath = `${API}categories?key=${this.key}`;
    const params = Object.entries(options);
    params.forEach((param) => {
      if (param[1]) {
        defaultPath += `&${param[0]}=${param[1]}`;
      }
    });
    return defaultPath;
  }

  /**
   * Searchs tenor api for gifs.
   * @param {string} query - What to search for.
   * @param {searchOptions} - Options for the search.
   */
  search(query, {
    limit = 20,
    contentfilter = 'off',
    locale = 'en_US',
    media_filter = null,
    ar_range = 'all',
    pos = null,
    anon_id = null,
  } = {}) {
    const options = { limit, contentfilter, locale, media_filter, ar_range, pos, anon_id };
    const path = this._buildSearchPath(query, options);
    return this._fetch(path);
  }

  /**
   * Returns the current trending GIFs.
   * @param {trendingOptions} - Options for the fetch.
   */
  getTrending({
    locale = 'en_US',
    media_filter = null,
    ar_range = 'all',
    contentfilter = 'off',
    limit = 20,
    pos = null,
    anon_id = null,
  } = {}) {
    const options = { locale, media_filter, ar_range, contentfilter, limit, pos, anon_id };
    const path = this._buildTrendingPath(options);
    return this._fetch(path);
  }

  /**
   * Returns a list of GIF categories.
   * @param {categoriesOptions} - Options for the fetch.
   */
  getCategories({
    locale = 'en_US',
    type = 'featured',
    contentfilter = 'off',
  } = {}) {
    const options = { locale, type, contentfilter };
    const path = this._buildCategoriesPath(options);
    return this._fetch(path);
  }
}

module.exports = TenorClient;

/**
 * Tenor Client search options.
 * @typedef {Object} searchOptions
 * @property {number} [limit=20] - The limit of results to be fetched.
 * @property {string} [contentfilter='off'] - The content safety filter level. (Values: off | low | medium | high)
 * @property {string} [locale='en_US'] - Language to interpret search string.
 * @property {string} [media_filter] - Reduce the number of GIF formats returned. (Values: basic | minimal)
 * @property {string} [ar_range='all'] - Filter the responce list to only include GIFs within certain aspect ratios. (Values: all | wide | standard)
 * @property {string} [pos] - Get results starting at position "value". Use a non-zero "next" value returned by API results to get the next set of results. pos is not an index and may be an integer, float, or string.
 * @property {string} [anon_id] - The anonymous_id tied to the given user.
*/

/**
 * Tenor Client trending options.
 * @typedef {Object} trendingOptions
 * @property {string} [locale='en_US'] - Language to interpret search string.
 * @property {string} [media_filter] - Reduce the number of GIF formats returned. (Values: basic | minimal)
 * @property {string} [ar_range='all'] - Filter the responce list to only include GIFs within certain aspect ratios. (Values: all | wide | standard)
 * @property {string} [contentfilter='off'] - The content safety filter level. (Values: off | low | medium | high)
 * @property {number} [limit=20] - The limit of results to be fetched.
 * @property {string} [pos] - Get results starting at position "value". Use a non-zero "next" value returned by API results to get the next set of results. pos is not an index and may be an integer, float, or string.
 * @property {string} [anon_id] - The anonymous_id tied to the given user.
*/

/**
 * Tenor Client categories options.
 * @typedef {Object} categoriesOptions
 * @property {string} [locale='en_US'] - Language to interpret search string.
 * @property {string} [type='featured'] - The type of categories returned. (Values: featured | emoji | trending)
 * @property {string} [contentfilter='off'] - The content safety filter level. (Values: off | low | medium | high)
*/