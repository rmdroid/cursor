const { sessionDate } = require('./shared');

function sma(values, period) {
  const out = new Array(values.length).fill(null);
  let sum = 0;
  for (let i = 0; i < values.length; i += 1) {
    sum += values[i];
    if (i >= period) sum -= values[i - period];
    if (i >= period - 1) out[i] = sum / period;
  }
  return out;
}

function ema(values, period) {
  const out = new Array(values.length).fill(null);
  if (values.length < period) return out;
  const k = 2 / (period + 1);
  let seed = 0;
  for (let i = 0; i < period; i += 1) seed += values[i];
  let prev = seed / period;
  out[period - 1] = prev;
  for (let i = period; i < values.length; i += 1) {
    prev = values[i] * k + prev * (1 - k);
    out[i] = prev;
  }
  return out;
}

function rsi(values, period = 14) {
  const out = new Array(values.length).fill(null);
  if (values.length <= period) return out;
  let gain = 0;
  let loss = 0;
  for (let i = 1; i <= period; i += 1) {
    const delta = values[i] - values[i - 1];
    if (delta >= 0) gain += delta;
    else loss -= delta;
  }
  let avgGain = gain / period;
  let avgLoss = loss / period;
  const at = (index) => (avgLoss === 0 ? 100 : 100 - (100 / (1 + avgGain / avgLoss)));
  out[period] = at(period);
  for (let i = period + 1; i < values.length; i += 1) {
    const delta = values[i] - values[i - 1];
    const g = delta > 0 ? delta : 0;
    const l = delta < 0 ? -delta : 0;
    avgGain = ((avgGain * (period - 1)) + g) / period;
    avgLoss = ((avgLoss * (period - 1)) + l) / period;
    out[i] = at(i);
  }
  return out;
}

function macd(values, fast = 12, slow = 26, signalPeriod = 9) {
  const fastEma = ema(values, fast);
  const slowEma = ema(values, slow);
  const line = values.map((_, i) => (
    fastEma[i] == null || slowEma[i] == null ? null : fastEma[i] - slowEma[i]
  ));
  const signalInput = [];
  const signalIndex = [];
  line.forEach((value, i) => {
    if (value == null) return;
    signalInput.push(value);
    signalIndex.push(i);
  });
  const signalEma = ema(signalInput, signalPeriod);
  const signal = new Array(values.length).fill(null);
  const histogram = new Array(values.length).fill(null);
  signalEma.forEach((value, i) => {
    if (value == null) return;
    const idx = signalIndex[i];
    signal[idx] = value;
    histogram[idx] = line[idx] - value;
  });
  return { line, signal, histogram };
}

function points(candles, series) {
  const out = [];
  series.forEach((value, i) => {
    if (!Number.isFinite(value)) return;
    out.push({ time: candles[i].time, value });
  });
  return out;
}

function lastFinite(series) {
  for (let i = series.length - 1; i >= 0; i -= 1) {
    if (Number.isFinite(series[i])) return series[i];
  }
  return null;
}

/**
 * Turn a TradingView chart.periods array (newest first) into candles plus
 * SMA 20/50/200, RSI 14 and MACD 12/26/9. These studies are calculated here
 * because BuiltInIndicator in v3.5.2 only ships volume-profile scripts.
 */
function withIndicators(periods) {
  const candles = [];
  [...(periods || [])].reverse().forEach((period) => {
    if (!period || !Number.isFinite(period.time)) return;
    const candle = {
      time: sessionDate(period.time),
      open: period.open,
      high: period.max,
      low: period.min,
      close: period.close,
    };
    if (![candle.open, candle.high, candle.low, candle.close].every(Number.isFinite)) return;
    if (candles.length && candles[candles.length - 1].time === candle.time) {
      candles[candles.length - 1] = candle;
      return;
    }
    candles.push(candle);
  });

  const closes = candles.map((candle) => candle.close);
  const sma20 = sma(closes, 20);
  const sma50 = sma(closes, 50);
  const sma200 = sma(closes, 200);
  const rsi14 = rsi(closes, 14);
  const macdSeries = macd(closes);

  return {
    candles,
    overlays: {
      sma20: points(candles, sma20),
      sma50: points(candles, sma50),
      sma200: points(candles, sma200),
      rsi14: points(candles, rsi14),
      macd: points(candles, macdSeries.line),
      macdSignal: points(candles, macdSeries.signal),
      macdHist: points(candles, macdSeries.histogram),
    },
    last: {
      sma20: lastFinite(sma20),
      sma50: lastFinite(sma50),
      sma200: lastFinite(sma200),
      rsi14: lastFinite(rsi14),
      macd: lastFinite(macdSeries.line),
      signal: lastFinite(macdSeries.signal),
      histogram: lastFinite(macdSeries.histogram),
    },
  };
}

module.exports = {
  sma,
  ema,
  rsi,
  macd,
  withIndicators,
};
