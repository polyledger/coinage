# Coinage

> A cryptocurrency coin aggregator library

coin·age, *noun*. def: coins collectively.

## API Reference

### Getting Started

``` javascript
const Coinage = require('coinage');
```

### Methods

**Coinage.getCoins()**

Returns an array of coin symbols.

**Coinage.getHistory(coin, [type], [period])**

Returns coin history data.

|Argument|Description|
|--------|-----------|
|coin|A coin symbol. E.g., `'ETH'`|
|type|Optional. Specify either `'market_cap'`, `'price'`, or `'volume'` to receive an array of historical data. If omitted, an object containing all three types will be returned.|
|period|Optional. Specify either `'1day'`, `'7day'`, `'30day'`, `'90day'`, `'180day'`, or `'365day'`.|

**Coinage.getTickers(coins, [currency])**

Returns ticker data for the given coins.

|Argument|Description|
|--------|-----------|
|coins|An array of symbols (e.g., `['ETH', 'BTC']`) to return ticker data for.|
|currency|The currency to use. Defaults to `'USD'`.|

---

Copyright © 2017 Polyledger. All rights reserved.
