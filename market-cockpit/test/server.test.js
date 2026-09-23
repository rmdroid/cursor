const test = require('node:test');
const assert = require('node:assert/strict');
const { normalizeSymbol } = require('../server');

test('continuous futures symbols with underscores are accepted', () => {
  assert.equal(normalizeSymbol('cme_mini:es1!'), 'CME_MINI:ES1!');
  assert.equal(normalizeSymbol('OANDA:XAUUSD'), 'OANDA:XAUUSD');
  assert.equal(normalizeSymbol('ES1!'), null);
  assert.equal(normalizeSymbol('DROP TABLE'), null);
});
