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
   * Builds the path.
   * @param {string} method - Method for the fetch.
   * @param {Object} [options] - The path options.
   */
  _buildPath(method, options) {
    let defaultPath = `${API}${method}?key=${this.key}`;
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
   * @param {searchOptions} [options] - Options for the search.
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
    const options = { q: query, limit, contentfilter, locale, media_filter, ar_range, pos, anon_id };
    const path = this._buildPath('search', options);
    return this._fetch(path);
  }

  /**
   * Returns the current trending GIFs.
   * @param {trendingOptions} [options] - Options for the fetch.
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
    const path = this._buildPath('trending', options);
    return this._fetch(path);
  }

  /**
   * Returns a list of GIF categories.
   * @param {categoriesOptions} [options] - Options for the fetch.
   */
  getCategories({
    locale = 'en_US',
    type = 'featured',
    contentfilter = 'off',
    anon_id = null,
  } = {}) {
    const options = { locale, type, contentfilter, anon_id };
    const path = this._buildPath('categories', options);
    return this._fetch(path);
  }

  /**
   * Returns the current trending search terms.
   * @param {trendingSearchTermsOptions} [options] - Options for the fetch.
   */
  trendingSearchTerms({
    locale = 'en_US',
    limit = 20,
    anon_id = null,
  } = {}) {
    const options = { locale, limit, anon_id };
    const path = this._buildPath('trending_terms', options);
    return this._fetch(path);
  }

  /**
   * Returns completed search terms when given a partial search term.
   * @param {string} query - The partial search term.
   * @param {autocompleteOptions} [options] - Options for the fetch.
   */
  autocomplete(query, {
    locale = 'en_US',
    limit = 20,
    anon_id = null,
  } = {}) {
    const options = { q: query, locale, limit, anon_id };
    const path = this._buildPath('autocomplete', options);
    return this._fetch(path);
  }

  /**
   * Returns a random GIF related to the search string.
   * @param {string} query - The search term.
   * @param {randomGifOptions} [options] - Options for the fetch.
   */
  randomGif(query, {
    locale = 'en_US',
    contentfilter = 'off',
    media_filter = null,
    ar_range = 'all',
    limit = 20,
    pos = null,
    anon_id = null,
  } = {}) {
    const options = { q: query, locale, contentfilter, media_filter, ar_range, limit, pos, anon_id };
    const path = this._buildPath('random', options);
    return this._fetch(path);
  }

  /**
   * Get an anonymous ID for a new user.
   */
  getAnonymousID() {
    const path = this._buildPath('anonid', {});
    return this._fetch(path);
  }

  /**
   * Fetches the GIFs with the corresponding ids.
   * @param {Array|string} ids - Ids of GIFs to fetch.
   * @param {getGifOptions} [options] - Options for the fetch.
   */
  getGifs(ids, {
    media_filter = null,
    limit = 20,
    pos = null,
    anon_id = null,
  } = {}) {
    const gifIds = Array.isArray(ids) ? ids.join(',') : ids;
    const options = { ids: gifIds, media_filter, limit, pos, anon_id };
    const path = this._buildPath('gifs', options);
    return this._fetch(path);
  }

  /**
   * Register a user's sharing of a GIF.
   * @param {string} id - The ID of the GIF.
   * @param {registerShareOptions} [options] - Options for the fetch.
   */
  registerShare(id, {
    locale = 'en_US',
    query = null,
    anon_id = 'a',
  } = {}) {
    const options = { id, locale, query, anon_id };
    const path = this._buildPath('registershare', options);
    return this._fetch(path);
  }

  /**
   * Returns alternative search terms given a search term.
   * @param {string} query - The search term.
   * @param {searchSuggestionsOptions} [options] - Options for the fetch.
   */
  searchSuggestions(query, {
    locale = 'en_US',
    limit = 20,
    anon_id = null,
  } = {}) {
    const options = { q: query, locale, limit, anon_id };
    const path = this._buildPath('search_suggestions', options);
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
 * @property {string} [anon_id] - The anonymous_id tied to the given user.
*/

/**
 * Tenor Client trending search terms options.
 * @typedef {Object} trendingSearchTermsOptions
 * @property {string} [locale='en_US'] - Language to interpret search string.
 * @property {number} [limit=20] - The limit of results to be fetched.
 * @property {string} [anon_id] - The anonymous_id tied to the given user.
 */

/**
 * Tenor Client auto complete options.
 * @typedef {Object} autocompleteOptions
 * @property {string} [locale='en_US'] - Language to interpret search string.
 * @property {number} [limit=20] - The limit of results to be fetched.
 * @property {string} [anon_id] - The anonymous_id tied to the given user.
 */

/**
 * Tenir Cliet random GIF options.
 * @typedef {Object} randomGifOptions
 * @property {string} [locale='en_US'] - Language to interpret search string.
 * @property {string} [contentfilter='off'] - The content safety filter level. (Values: off | low | medium | high)
 * @property {string} [media_filter] - Reduce the number of GIF formats returned. (Values: basic | minimal)
 * @property {string} [ar_range='all'] - Filter the responce list to only include GIFs within certain aspect ratios. (Values: all | wide | standard)
 * @property {number} [limit=20] - The limit of results to be fetched.
 * @property {string} [pos] - Get results starting at position "value". Use a non-zero "next" value returned by API results to get the next set of results. pos is not an index and may be an integer, float, or string.
 * @property {string} [anon_id] - The anonymous_id tied to the given user.
 */

/**
 * Tenor Client get GIFs options.
 * @typedef {Object} getGifOptions
 * @property {string} [media_filter] - Reduce the number of GIF formats returned. (Values: basic | minimal)
 * @property {number} [limit=20] - The limit of results to be fetched.
 * @property {string} [pos] - Get results starting at position "value". Use a non-zero "next" value returned by API results to get the next set of results. pos is not an index and may be an integer, float, or string.
 * @property {string} [anon_id] - The anonymous_id tied to the given user.
 */

/**
 * Tenor Client register share options.
 * @typedef {Object} registerShareOptions
 * @property {string} [locale='en_US'] - Language to interpret search string.
 * @property {string} [query] - The search string that lead to this share.
 * @property {string} [anon_id] - The anonymous_id tied to the given user.
 */

/**
 * Tenor Client search suggestions options.
 * @typedef {Object} searchSuggestionsOptions
 * @property {string} [locale='en_US'] - Language to interpret search string.
 * @property {number} [limit=20] - The limit of results to be fetched.
 * @property {string} [anon_id] - The anonymous_id tied to the given user.
 */