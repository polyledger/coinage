# Coinage

[![npm version](https://badge.fury.io/js/coinage-lib.svg)](https://badge.fury.io/js/coinage-lib)

> A cryptocurrency coin aggregator library

coin·age, _noun_. def: coins collectively.

## API Reference

### Getting Started

```javascript
const Coinage = require('coinage-lib');

Coinage.getCoins().then((response) => { ... }).catch((error) => { ... });
```

### Methods

**Coinage.getCoins()**

Returns promise that resolves with an array of coin symbols.

**Coinage.getHistory(coin, [type], [period])**

Returns a promise that resolves with coin history data.

| Argument | Description                                                                                                                                                                  |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| coin     | A coin symbol. E.g., `'ETH'`                                                                                                                                                 |
| type     | Optional. Specify either `'market_cap'`, `'price'`, or `'volume'` to receive an array of historical data. If omitted, an object containing all three types will be returned. |
| period   | Optional. Specify either `'1day'`, `'7day'`, `'30day'`, `'90day'`, `'180day'`, or `'365day'`.                                                                                |

**Coinage.getTickers([coins], [currency])**

Returns a promise that resolves with ticker data for the given coins.

| Argument | Description                                                                                                    |
| -------- | -------------------------------------------------------------------------------------------------------------- |
| coins    | An array of symbols (e.g., `['ETH', 'BTC']`) to return ticker data for. Leave empty array to return all coins. |
| currency | The currency to use. Defaults to `'USD'`.                                                                      |
| limit    | The number of results to return. Set to `0` for all results. Defaults to `100`.                                |

---

Copyright © 2017 Polyledger. All rights reserved.
