/* eslint-env node, mocha */

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const Coinage = require('../index.js');

const assert = chai.assert;
const expect = chai.expect;

chai.use(chaiAsPromised);

describe('Coinage', () => {
  describe('#getCoins()', () => {
    it('should return an array of coins', (done) => {
      Coinage.getCoins().then((response) => {
        expect(response).to.be.an('array');
        done();
      }).catch((error) => { done(error); });
    });
  });

  describe('#getHistory()', () => {
    it('should throw an error if the \'coin\' parameter is missing', () =>
      expect(Coinage.getHistory()).to.be.rejectedWith(Error),
    );

    it('should return a history object when \'type\' and \'period\' parameters are not specified', (done) => {
      Coinage.getHistory('BTC').then((response) => {
        expect(response).to.be.an('object');
        done();
      }).catch((error) => { done(error); });
    });

    it('should return a history object when the \'type\' parameter is not specified', (done) => {
      Coinage.getHistory('BTC', null, '1day').then((response) => {
        expect(response).to.be.an('object');
        expect(response).to.have.keys(['price', 'market_cap', 'volume']);
        done();
      }).catch((error) => { done(error); });
    });

    it('should return history arrays for all possible values of the \'type\' parameter when the \'period\' parameter is not specified', (done) => {
      const types = ['market_cap', 'price', 'volume'];
      let count = 0;
      types.forEach((element, index, array) => {
        Coinage.getHistory('BTC', element).then((response) => {
          expect(response).to.be.an('array');
          count += 1;
          if (count === array.length) done();
        }).catch((error) => { done(error); });
      });
    });

    it('should throw an error if the \'type\' parameter is invalid', () =>
      expect(Coinage.getHistory('BTC', 'invalid')).to.be.rejectedWith(Error),
    );
  });

  describe('#getTickers()', () => {
    it('should return ticker data', () => {
      Coinage.getTickers(['ETH', 'BTC']).then((response) => {
        expect(response).to.be.an('array');
        expect(response.length).to.equal(2);
      }).catch((error) => { done(error); });
    });

    it('should throw an error if the \'coins\' parameter is missing.', () =>
      expect(Coinage.getTickers()).to.be.rejectedWith(Error),
    );
  });

  describe('#appendUrlParams()', () => {
    const options = {
      url: 'https://www.polyledger.io/',
    };

    it('should format basic URL parameters', () => {
      options.params = ['foo=bar', 'baz=qux'];
      const expected = 'https://www.polyledger.io/' + '?foo=bar&baz=qux';
      assert.equal(expected, Coinage.appendUrlParams(options));
    })
  });

  describe('#appendUrlPath()', () => {
    const options = {
      base: 'https://www.polyledger.io/',
    };

    it('should format a basic URL with a path', () => {
      options.path = ['foo', 'bar', 'baz'];
      const expected = 'https://www.polyledger.io/foo/bar/baz';
      assert.equal(expected, Coinage.appendUrlPath(options));
    });

    it('should filter out null path elements', () => {
      options.path = ['foo', null, 'bar', null, 'baz'];
      const expected = 'https://www.polyledger.io/foo/bar/baz';
      assert.equal(expected, Coinage.appendUrlPath(options));
    });
  });
});
