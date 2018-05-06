'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

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
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return request({
                  method: 'GET',
                  url: 'https://www.coincap.io/coins/'
                });

              case 2:
                response = _context.sent;

                response = JSON.parse(response);
                return _context.abrupt('return', response);

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getCoins() {
        return _ref.apply(this, arguments);
      }

      return getCoins;
    }()

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
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(coin) {
        var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var period = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
        var options, response;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (coin) {
                  _context2.next = 2;
                  break;
                }

                throw new Error("Expected argument 'coin' is missing.");

              case 2:
                options = {
                  base: 'https://www.coincap.io/',
                  path: ['history', period, coin]
                };
                _context2.next = 5;
                return request({
                  method: 'GET',
                  url: Coinage.appendUrlPath(options)
                });

              case 5:
                response = _context2.sent;

                response = Coinage.pruneResponse(JSON.parse(response), type);
                return _context2.abrupt('return', response);

              case 8:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getHistory(_x3) {
        return _ref2.apply(this, arguments);
      }

      return getHistory;
    }()

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
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var coins = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var currency = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'USD';
        var limit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : constants.LIMIT;
        var options, response;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                options = {
                  url: 'https://api.coinmarketcap.com/v1/ticker/',
                  params: ['convert=' + currency, 'limit=' + limit]
                };
                _context3.next = 3;
                return request({
                  method: 'GET',
                  url: Coinage.appendUrlParams(options)
                });

              case 3:
                response = _context3.sent;

                response = JSON.parse(response);

                if (!coins.length) {
                  _context3.next = 7;
                  break;
                }

                return _context3.abrupt('return', response.filter(function (element) {
                  return coins.includes(element.symbol);
                }));

              case 7:
                return _context3.abrupt('return', response);

              case 8:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getTickers() {
        return _ref3.apply(this, arguments);
      }

      return getTickers;
    }()

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
