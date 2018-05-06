'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * Copyright © 2017 Polyledger. All rights reserved.
 */

var request = require('request-promise');
var constants = require('./lib/constants');

var Coinage = function () {
  function Coinage() {
    _classCallCheck(this, Coinage);
  }

  _createClass(Coinage, null, [{
    key: 'getCoins',

    /**
     * @function getCoins
     * @returns {array}
     * Returns an array of the names of coins.
     */
    value: async function getCoins() {
      var response = await request({
        method: 'GET',
        url: 'https://www.coincap.io/coins/'
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

  }, {
    key: 'getHistory',
    value: async function getHistory(coin) {
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var period = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      if (!coin) throw new Error("Expected argument 'coin' is missing.");
      var options = {
        base: 'https://www.coincap.io/',
        path: ['history', period, coin]
      };
      var response = await request({
        method: 'GET',
        url: Coinage.appendUrlPath(options)
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

  }, {
    key: 'getTickers',
    value: async function getTickers() {
      var coins = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var currency = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'USD';
      var limit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : constants.LIMIT;

      var options = {
        url: 'https://api.coinmarketcap.com/v1/ticker/',
        params: ['convert=' + currency, 'limit=' + limit]
      };
      var response = await request({
        method: 'GET',
        url: Coinage.appendUrlParams(options)
      });
      response = JSON.parse(response);
      if (coins.length) {
        return response.filter(function (element) {
          return coins.includes(element.symbol);
        });
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

  }, {
    key: 'pruneResponse',
    value: function pruneResponse(response, key) {
      if (!key) return response;else if (key in response) return response[key];
      throw new Error('There is no key \'' + key + '\' in the response object.');
    }

    /**
     * @function appendUrlParams
     * @param {object} options
     * @returns {string}
     * Formats the URL given the components of its parameters.
     */

  }, {
    key: 'appendUrlParams',
    value: function appendUrlParams(options) {
      var url = options.url;
      var params = options.params.join('&');
      params = '?' + params;
      return url + params;
    }

    /**
     * @function appendUrlPath
     * @param {object} options
     * @returns {string}
     * Formats the URL given the components of its path.
     */

  }, {
    key: 'appendUrlPath',
    value: function appendUrlPath(options) {
      var url = options.base;
      var path = options.path.filter(function (element) {
        return !!element;
      });
      return url + path.join('/');
    }
  }]);

  return Coinage;
}();

module.exports = Coinage;
