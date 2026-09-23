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
  historicalVolatility,
  volaJump,
  buildVolatilityRow,
  VOLATILITY_FEEDS,
  formatVol,
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

test('HV20 is the annualized sample stdev of log returns', () => {
  const flat = Array.from({ length: 30 }, () => 100);
  const flatHv = historicalVolatility(flat);
  assert.equal(flatHv[19], null);
  assert.equal(flatHv[20], 0);

  const r = Math.log(1.01);
  const returns = Array.from({ length: 20 }, (_, i) => (i % 2 === 0 ? r : -r));
  const closes = [100];
  returns.forEach((ret) => closes.push(closes[closes.length - 1] * Math.exp(ret)));
  const mean = returns.reduce((sum, value) => sum + value, 0) / returns.length;
  const variance = returns.reduce((sum, value) => sum + (value - mean) ** 2, 0) / (returns.length - 1);
  const expected = Math.sqrt(variance) * Math.sqrt(252) * 100;
  const hv = historicalVolatility(closes);
  assert.ok(Math.abs(hv[20] - expected) < 1e-9);
  assert.equal(hv[19], null);
});

test('a zero close does not invent a volatility number', () => {
  const closes = Array.from({ length: 25 }, (_, i) => (i === 10 ? 0 : 100 + i));
  const hv = historicalVolatility(closes);
  assert.equal(hv[10], null);
  assert.equal(hv[24], null);
});

test('vola jump fires at +30% versus the previous five readings and ignores declines', () => {
  const up = volaJump([10, 10, 10, 10, 10, 14]);
  assert.equal(up.jumped, true);
  assert.equal(up.baseline, 10);
  assert.equal(volaJump([10, 10, 10, 10, 10, 12]).jumped, false);
  assert.equal(volaJump([10, 10, 10, 10, 10, 8]).jumped, false);
  assert.equal(volaJump([10, 10, 10, 12]).ready, false);
});

test('IV stays empty when the feed has no verified symbol', () => {
  const euro = VOLATILITY_FEEDS.find((feed) => feed.symbol === 'FX:EURUSD');
  const es = VOLATILITY_FEEDS.find((feed) => feed.symbol === 'CME_MINI:ES1!');
  const gold = VOLATILITY_FEEDS.find((feed) => feed.symbol === 'OANDA:XAUUSD');
  const spx = VOLATILITY_FEEDS.find((feed) => feed.symbol === 'SP:SPX');
  const btc = VOLATILITY_FEEDS.find((feed) => feed.symbol === 'BITSTAMP:BTCUSD');
  assert.equal(gold.ivSymbol, 'CBOE:GVZ');
  assert.equal(spx.ivSymbol, 'TVC:VIX');
  assert.equal(btc.ivSymbol, 'VOLMEX:BVIV');
  assert.equal(es.ivSymbol, null);
  assert.equal(euro.ivSymbol, null);

  const closes = Array.from({ length: 40 }, (_, i) => 100 + i);
  const row = buildVolatilityRow(euro, { closes, ivLast: 99, ivCloses: [1, 2, 3, 4, 5, 6] });
  assert.equal(row.iv, null);
  assert.equal(row.ivAvailable, false);
  assert.match(row.ivReason, /unavailable via TV API/);
  assert.equal(row.hv20 > 0, true);
  assert.equal(formatVol(row.hv20).endsWith('%'), true);
});

test('a live IV quote is kept and a missing quote is not replaced with a guess', () => {
  const spx = VOLATILITY_FEEDS.find((feed) => feed.symbol === 'SP:SPX');
  const closes = Array.from({ length: 40 }, () => 100);
  const live = buildVolatilityRow(spx, {
    closes,
    ivLast: 14.29,
    ivCloses: [16, 16, 16, 16, 16, 14.2],
  });
  assert.equal(live.ivAvailable, true);
  assert.equal(live.iv, 14.29);
  assert.equal(live.ivName, 'VIX');
  assert.equal(live.ivJump, false);

  const pending = buildVolatilityRow(spx, { closes, ivCloses: null, ivLast: null });
  assert.equal(pending.ivPending, true);
  assert.equal(pending.iv, null);
  assert.equal(pending.ivReason, null);

  const failed = buildVolatilityRow(spx, { closes, ivCloses: [], ivLast: null, ivError: 'no_such_symbol' });
  assert.equal(failed.ivAvailable, false);
  assert.equal(failed.iv, null);
  assert.match(failed.ivReason, /unavailable via TV API/);
  assert.doesNotMatch(failed.ivReason, /14/);
});

test('snapshot adds one vola line and still leaves funding stubs untouched', () => {
  const quotes = {
    'OANDA:XAUUSD': {
      name: 'XAUUSD', last: 4300.25, changePct: -1.34, dayHigh: 4369.56, dayLow: 4299.6,
      high52: 5602.23, low52: 3722.22, pricescale: 100,
    },
    'SP:SPX': {
      name: 'SPX', last: 7764.64, changePct: 0, dayHigh: 7780, dayLow: 7700,
      high52: 7800, low52: 5000, pricescale: 100,
    },
  };
  const gold = buildVolatilityRow(
    VOLATILITY_FEEDS.find((feed) => feed.symbol === 'OANDA:XAUUSD'),
    { closes: Array.from({ length: 40 }, () => 100), ivLast: 23.59, ivCloses: [20, 20, 20, 20, 20, 23] },
  );
  const euro = buildVolatilityRow(
    VOLATILITY_FEEDS.find((feed) => feed.symbol === 'FX:EURUSD'),
    { closes: Array.from({ length: 40 }, (_, i) => 1.1 + i * 0.001) },
  );
  const snapshot = buildSnapshot({
    watchlist: ['OANDA:XAUUSD', 'SP:SPX'],
    quotes,
    volatility: [gold, euro],
    now: new Date('2026-09-23T20:30:00Z'),
  });
  assert.equal(snapshot.mode, 'Close');
  assert.ok(snapshot.lines.length <= 6);
  const text = snapshot.lines.join('\n');
  assert.match(text, /Vola Gold HV20/);
  assert.match(text, /IV 23,59% GVZ/);
  assert.match(text, /Euro HV20/);
  assert.match(text, /Euro HV20 [^\n]*IV unavailable via TV API/);
  assert.match(text, /€STR\/SOFR\/SARON unavailable via TV API/);
  assert.equal((text.match(/23,59/g) || []).length, 1);
});
