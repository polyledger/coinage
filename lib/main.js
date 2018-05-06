/*
 * Copyright © 2017 Polyledger. All rights reserved.
 */

const request = require('request-promise');
const constants = require('./lib/constants');

class Coinage {
  /**
   * @function getCoins
   * @returns {array}
   * Returns an array of the names of coins.
   */
  static async getCoins() {
    let response = await request({
      method: 'GET',
      url: 'https://www.coincap.io/coins/',
    });
    response = JSON.parse(response);
    return response;
  }

  /**
   * @function getHistory
   * @param {string} coin
   * @param {string} type
   * @param {string} period
   * @returns {object|array}
   * Gets the type of history for a coin during a period. If no type is specified,
   * then returns an object with market cap, price, and volume history arrays. If
   * a type is specified, an array is returned.
   */
  static async getHistory(coin, type = null, period = null) {
    if (!coin) throw new Error("Expected argument 'coin' is missing.");
    const options = {
      base: 'https://www.coincap.io/',
      path: ['history', period, coin],
    };
    let response = await request({
      method: 'GET',
      url: Coinage.appendUrlPath(options),
    });
    response = Coinage.pruneResponse(JSON.parse(response), type);
    return response;
  }

  /**
   * @function getTickers
   * @param {string[]} coins
   * @param {string} currency
   * @param {number} limit
   * @returns {array}
   * Gets ticker data for the top 100 (default limit) coins and filters results
   * based on the 'coins' parameter. The currency defaults to USD.
   */
  static async getTickers(coins = [], currency = 'USD', limit = constants.LIMIT) {
    const options = {
      url: 'https://api.coinmarketcap.com/v1/ticker/',
      params: [`convert=${currency}`, `limit=${limit}`],
    };
    let response = await request({
      method: 'GET',
      url: Coinage.appendUrlParams(options),
    });
    response = JSON.parse(response);
    if (coins.length) {
      return response.filter(element => coins.includes(element.symbol));
    }
    return response;
  }

  /**
   * @function pruneResponse
   * @param {array|object} response
   * @param {string} key
   * @returns {array|object}
   * Prunes the response object to a single array if a type was specified.
   */
  static pruneResponse(response, key) {
    if (!key) return response;
    else if (key in response) return response[key];
    throw new Error(`There is no key '${key}' in the response object.`);
  }

  /**
   * @function appendUrlParams
   * @param {object} options
   * @returns {string}
   * Formats the URL given the components of its parameters.
   */
  static appendUrlParams(options) {
    const url = options.url;
    let params = options.params.join('&');
    params = `?${params}`;
    return url + params;
  }

  /**
   * @function appendUrlPath
   * @param {object} options
   * @returns {string}
   * Formats the URL given the components of its path.
   */
  static appendUrlPath(options) {
    const url = options.base;
    const path = options.path.filter(element => !!element);
    return url + path.join('/');
  }
}

module.exports = Coinage;
