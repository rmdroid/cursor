const test = require('node:test');
const assert = require('node:assert/strict');
const {
  esFrontMonth,
  sessionDate,
  sessionMode,
  buildFunding,
  buildSnapshot,
  adviceLabel,
  decimalsFor,
} = require('../src/shared');

test('forex daily bar opening at 21:00 UTC uses the next session date', () => {
  assert.equal(sessionDate(1790110800), '2026-09-23');
});

test('E-mini front month rolls after the third Friday 09:30 New York', () => {
  const before = esFrontMonth(new Date('2026-09-18T13:29:00Z'));
  assert.equal(before.code, 'ESU2026');
  assert.equal(before.lastTradeDay, '2026-09-18');

  const after = esFrontMonth(new Date('2026-09-23T12:00:00Z'));
  assert.equal(after.code, 'ESZ2026');
  assert.equal(after.lastTradeDay, '2026-12-18');
  assert.equal(after.continuousSymbol, 'CME_MINI:ES1!');
});

test('session mode follows the Zurich clock around the US cash session', () => {
  assert.equal(sessionMode(new Date('2026-09-23T06:00:00Z')), 'Pre-Market');
  assert.equal(sessionMode(new Date('2026-09-23T14:00:00Z')), 'Laufend');
  assert.equal(sessionMode(new Date('2026-09-23T20:30:00Z')), 'Close');
  assert.equal(sessionMode(new Date('2026-09-26T14:00:00Z')), 'Close');
});

test('funding slots stay visible when the fixing is not on the TV API', () => {
  const slots = buildFunding({
    'TVC:DE10Y': { last: 3.4722, pricescale: 10000 },
    'TVC:FR10Y': { last: 4.5394, pricescale: 10000 },
    'TVC:DE02Y': { last: 3.2556, pricescale: 10000 },
    'FRED:SOFR': { description: 'Secured Overnight Financing Rate' },
  });
  const byId = Object.fromEntries(slots.map((slot) => [slot.id, slot]));
  assert.equal(slots.length, 7);
  assert.match(byId.estr.reason, /unavailable via TV API/);
  assert.match(byId.saron.reason, /unavailable via TV API/);
  assert.match(byId.sofr.reason, /unavailable via TV API/);
  assert.equal(byId.sofr.available, false);
  assert.equal(byId.de10y.available, true);
  assert.ok(Math.abs(byId['oat-bund'].value - 106.72) < 0.011);
});

test('SOFR slot fills in when a last price actually arrives', () => {
  const slots = buildFunding({
    'FRED:SOFR': { last: 4.31, pricescale: 100 },
  });
  const sofr = slots.find((slot) => slot.id === 'sofr');
  assert.equal(sofr.available, true);
  assert.equal(sofr.quote.last, 4.31);
});

test('snapshot stays within five lines and leads with the session', () => {
  const quotes = {
    'OANDA:XAUUSD': {
      name: 'XAUUSD', last: 4300.25, changePct: -1.34, dayHigh: 4369.56, dayLow: 4299.6,
      high52: 5602.23, low52: 3722.22, pricescale: 100,
    },
    'BITSTAMP:BTCUSD': {
      name: 'BTCUSD', last: 85465, changePct: -0.85, dayHigh: 87271, dayLow: 85458,
      high52: 126272, low52: 57734, pricescale: 100,
    },
    'CME_MINI:ES1!': {
      name: 'ES1!', last: 7827.5, changePct: -0.05, dayHigh: 7843.25, dayLow: 7827,
      high52: 7848.5, low52: 6353.25, pricescale: 100,
    },
  };
  const snapshot = buildSnapshot({
    watchlist: ['OANDA:XAUUSD', 'BITSTAMP:BTCUSD', 'CME_MINI:ES1!'],
    quotes,
    now: new Date('2026-09-23T06:00:00Z'),
  });
  assert.equal(snapshot.mode, 'Pre-Market');
  assert.ok(snapshot.lines.length >= 3 && snapshot.lines.length <= 5);
  assert.match(snapshot.lines[0], /^Pre-Market/);
  assert.match(snapshot.lines.join('\n'), /4300,25/);
  assert.match(snapshot.lines.join('\n'), /ESZ2026/);
  assert.match(snapshot.lines.join('\n'), /unavailable via TV API/);
});

test('getTA-scaled advice maps to German labels', () => {
  assert.equal(adviceLabel(-1.866), 'Starker Verkauf');
  assert.equal(adviceLabel(-0.364), 'Verkauf');
  assert.equal(adviceLabel(0), 'Neutral');
  assert.equal(adviceLabel(1.2), 'Starker Kauf');
});

test('pricescale drives decimal places', () => {
  assert.equal(decimalsFor({ pricescale: 100000, last: 1.14 }), 5);
  assert.equal(decimalsFor({ pricescale: 100, last: 4300 }), 2);
});
