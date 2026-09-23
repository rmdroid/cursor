const test = require('node:test');
const assert = require('node:assert/strict');
const { sma, rsi, macd, withIndicators } = require('../src/indicators');

test('SMA uses a simple trailing window', () => {
  assert.deepEqual(sma([1, 2, 3, 4, 5], 3), [null, null, 2, 3, 4]);
});

test('RSI is 100 when every change is a gain', () => {
  const closes = Array.from({ length: 20 }, (_, i) => 100 + i);
  const values = rsi(closes, 14);
  assert.equal(values[14], 100);
  assert.equal(values[19], 100);
});

test('MACD of a flat series is zero once both averages exist', () => {
  const closes = Array.from({ length: 40 }, () => 10);
  const series = macd(closes);
  assert.ok(Math.abs(series.line[30]) < 1e-9);
  assert.ok(Math.abs(series.signal[39]) < 1e-9);
});

test('chart periods are reversed into session candles with overlays', () => {
  const periods = [];
  for (let i = 0; i < 30; i += 1) {
    const close = 129 - i;
    periods.push({
      time: Date.UTC(2026, 0, 30 - i) / 1000,
      open: close - 1,
      close,
      max: close + 1,
      min: close - 2,
    });
  }
  const built = withIndicators(periods);
  assert.equal(built.candles.length, 30);
  assert.ok(built.candles[0].time < built.candles[built.candles.length - 1].time);
  assert.equal(built.overlays.sma20.length, 11);
  assert.ok(built.last.sma20 > 100);
  assert.equal(built.last.rsi14, 100);
  assert.equal(built.last.sma200, null);
});
