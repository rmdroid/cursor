const test = require('node:test');
const assert = require('node:assert/strict');
const { normalizeSymbol } = require('../server');
const { TvBridge } = require('../src/tvBridge');

test('continuous futures symbols with underscores are accepted', () => {
  assert.equal(normalizeSymbol('cme_mini:es1!'), 'CME_MINI:ES1!');
  assert.equal(normalizeSymbol('OANDA:XAUUSD'), 'OANDA:XAUUSD');
  assert.equal(normalizeSymbol('ES1!'), null);
  assert.equal(normalizeSymbol('DROP TABLE'), null);
});

test('verified IV symbols pass the same id check', () => {
  assert.equal(normalizeSymbol('TVC:VIX'), 'TVC:VIX');
  assert.equal(normalizeSymbol('CBOE:GVZ'), 'CBOE:GVZ');
  assert.equal(normalizeSymbol('VOLMEX:BVIV'), 'VOLMEX:BVIV');
});

test('the quote session follows verified IV indexes and drops the bad guesses', () => {
  const desired = new TvBridge().desired();
  assert.equal(desired.has('TVC:VIX'), true);
  assert.equal(desired.has('CBOE:GVZ'), true);
  assert.equal(desired.has('VOLMEX:BVIV'), true);
  assert.equal(desired.has('OANDA:XAUUSD'), true);
  assert.equal(desired.has('TVC:GVZ'), false);
  assert.equal(desired.has('TVC:EVZ'), false);
  assert.equal(desired.has('CBOE:EVZ'), false);
  assert.equal(desired.has('TVC:MOVE'), false);
});
