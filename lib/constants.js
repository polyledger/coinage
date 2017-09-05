// List supported coin symbols and their known aliases.
const SUPPORTED_COINS = {
  BTC: ['Bitcoin'],
  ETH: ['Ethereum', 'Ether'],
  BCH: ['Bitcoin Cash'],
  XRP: ['Ripple'],
  LTC: ['Litecoin'],
  DASH: ['Dash', 'DigitalCash'],
  XEM: ['NEM'],
  ETC: ['Ethereum Classic'],
  IOT: ['IOTA'],
  XMR: ['Monero'],
};

const LIMIT = Object.keys(SUPPORTED_COINS).length;

module.exports = {
  SUPPORTED_COINS,
  LIMIT,
};
