const TradingView = require('@mathieuc/tradingview');
const { withIndicators } = require('./indicators');
const { adviceLabel, VOLATILITY_FEEDS } = require('./shared');

const QUOTE_FIELDS = [
  'lp',
  'lp_time',
  'ch',
  'chp',
  'high_price',
  'low_price',
  'open_price',
  'prev_close_price',
  'description',
  'short_name',
  'exchange',
  'currency_code',
  'type',
  'pro_name',
  'current_session',
  'pricescale',
  'price_52_week_high',
  'price_52_week_low',
];

const DEFAULT_WATCHLIST = [
  'OANDA:XAUUSD',
  'BITSTAMP:BTCUSD',
  'SP:SPX',
  'CME_MINI:ES1!',
  'FX:EURUSD',
  'SIX:NESN',
];

const FUNDING_SYMBOLS = ['FRED:SOFR', 'TVC:DE02Y', 'TVC:DE10Y', 'TVC:FR10Y'];

const CHART_RANGE = 300;
const CHART_TTL_MS = 45 * 1000;
const TA_TTL_MS = 5 * 60 * 1000;

function num(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function errorText(parts) {
  return parts.map((part) => {
    if (part instanceof Error) return part.message;
    if (typeof part === 'string') return part;
    try {
      return JSON.stringify(part);
    } catch (err) {
      return String(part);
    }
  }).join(' ');
}

function clientOptions() {
  const options = {};
  if (process.env.TRADINGVIEW_SESSION) options.token = process.env.TRADINGVIEW_SESSION;
  if (process.env.TRADINGVIEW_SIGNATURE) options.signature = process.env.TRADINGVIEW_SIGNATURE;
  return options;
}

class TvBridge {
  constructor() {
    this.userSymbols = new Set(DEFAULT_WATCHLIST);
    this.markets = new Map();
    this.listeners = new Set();
    this.status = 'connecting';
    this.error = null;
    this.client = null;
    this.quoteSession = null;
    this.generation = 0;
    this.chartChain = Promise.resolve();
    this.chartCache = new Map();
    this.taCache = new Map();
    this.emitTimer = null;
  }

  desired() {
    const ivSymbols = VOLATILITY_FEEDS.map((feed) => feed.ivSymbol).filter(Boolean);
    return new Set([...this.userSymbols, ...FUNDING_SYMBOLS, ...ivSymbols]);
  }

  onState(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  emitSoon() {
    if (this.emitTimer) return;
    this.emitTimer = setTimeout(() => {
      this.emitTimer = null;
      this.emitNow();
    }, 200);
  }

  emitNow() {
    if (this.emitTimer) {
      clearTimeout(this.emitTimer);
      this.emitTimer = null;
    }
    const state = this.getState();
    this.listeners.forEach((listener) => listener(state));
  }

  start() {
    this.connect();
  }

  connect() {
    const generation = this.generation + 1;
    this.generation = generation;
    this.status = 'connecting';
    this.error = null;
    this.markets = new Map();
    this.chartCache.clear();

    const client = new TradingView.Client(clientOptions());
    this.client = client;

    const watchdog = setTimeout(() => {
      if (generation !== this.generation || this.status !== 'connecting') return;
      this.status = 'error';
      this.error = 'Zeitüberschreitung beim Verbinden mit TradingView';
      this.emitNow();
    }, 15000);

    client.onConnected(() => {
      if (generation !== this.generation) return;
      clearTimeout(watchdog);
      this.status = 'live';
      this.error = null;
      this.emitNow();
    });

    client.onError((...err) => {
      if (generation !== this.generation) return;
      clearTimeout(watchdog);
      this.status = 'error';
      this.error = errorText(err) || 'WebSocket-Fehler';
      this.emitNow();
    });

    client.onDisconnected(() => {
      if (generation !== this.generation) return;
      clearTimeout(watchdog);
      this.status = 'error';
      this.error = this.error || 'WebSocket getrennt';
      this.emitNow();
    });

    this.quoteSession = new client.Session.Quote({ customFields: QUOTE_FIELDS });
    this.syncSubscriptions();
    this.emitNow();
  }

  reconnect() {
    const previous = this.client;
    this.client = null;
    this.quoteSession = null;
    if (previous) {
      try {
        previous.end();
      } catch (err) {
        console.error('Failed to close TradingView client', err);
      }
    }
    this.connect();
  }

  setWatchlist(symbols) {
    this.userSymbols = new Set(symbols);
    this.syncSubscriptions();
    this.emitNow();
  }

  syncSubscriptions() {
    if (!this.quoteSession) return;
    const desired = this.desired();
    desired.forEach((symbol) => this.ensure(symbol));
    [...this.markets.keys()].forEach((symbol) => {
      if (desired.has(symbol)) return;
      try {
        this.markets.get(symbol).market.close();
      } catch (err) {
        console.error('Failed to close quote', symbol, err);
      }
      this.markets.delete(symbol);
    });
  }

  ensure(symbol) {
    if (this.markets.has(symbol) || !this.quoteSession) return;
    const entry = {
      quote: null,
      error: null,
      updatedAt: null,
    };
    const market = new this.quoteSession.Market(symbol);
    market.onData((data) => {
      entry.quote = data;
      entry.error = null;
      entry.updatedAt = Date.now();
      this.emitSoon();
    });
    market.onError((...err) => {
      entry.error = errorText(err);
      this.emitSoon();
    });
    this.markets.set(symbol, { market, entry });
  }

  toQuote(symbol) {
    const stored = this.markets.get(symbol);
    const data = (stored && stored.entry.quote) || {};
    const name = data.short_name || symbol.split(':')[1] || symbol;
    return {
      symbol,
      name,
      description: data.description || '',
      type: data.type || '',
      currency: data.currency_code || '',
      session: data.current_session || '',
      last: num(data.lp),
      change: num(data.ch),
      changePct: num(data.chp),
      dayHigh: num(data.high_price),
      dayLow: num(data.low_price),
      high52: num(data.price_52_week_high),
      low52: num(data.price_52_week_low),
      pricescale: num(data.pricescale),
      updatedAt: data.lp_time ? data.lp_time * 1000 : (stored && stored.entry.updatedAt) || null,
      error: stored ? stored.entry.error : null,
    };
  }

  getState() {
    const quotes = {};
    this.desired().forEach((symbol) => {
      quotes[symbol] = this.toQuote(symbol);
    });
    return {
      status: this.status,
      error: this.error,
      serverTime: Date.now(),
      quotes,
    };
  }

  async search(query) {
    const rows = await TradingView.searchMarketV3(query);
    return (rows || []).slice(0, 8).map((row) => ({
      id: row.id,
      description: row.description,
      type: row.type,
      exchange: row.exchange,
    }));
  }

  async technicalAnalysis(symbol) {
    const cached = this.taCache.get(symbol);
    if (cached && Date.now() - cached.at < TA_TTL_MS) return cached.value;
    const raw = await TradingView.getTA(symbol);
    let value = null;
    if (raw) {
      value = {};
      Object.entries(raw).forEach(([timeframe, row]) => {
        value[timeframe] = {
          other: row.Other,
          all: row.All,
          ma: row.MA,
          otherLabel: adviceLabel(row.Other),
          allLabel: adviceLabel(row.All),
          maLabel: adviceLabel(row.MA),
        };
      });
    }
    this.taCache.set(symbol, { at: Date.now(), value });
    return value;
  }

  getChart(symbol, timeframe) {
    const key = `${symbol}|${timeframe}`;
    const cached = this.chartCache.get(key);
    if (cached && Date.now() - cached.at < CHART_TTL_MS) return Promise.resolve(cached.value);

    const run = this.chartChain.then(() => this.loadChart(symbol, timeframe));
    this.chartChain = run.then(() => {}, () => {});
    return run.then((value) => {
      this.chartCache.set(key, { at: Date.now(), value });
      return value;
    });
  }

  loadChart(symbol, timeframe) {
    const client = this.client;
    if (!client || this.status === 'error') {
      return Promise.reject(new Error(this.error || 'Keine Verbindung zur TradingView-Schnittstelle'));
    }

    return new Promise((resolve, reject) => {
      const chart = new client.Session.Chart();
      let settled = false;
      let quiet = null;

      const cleanup = () => {
        if (quiet) clearTimeout(quiet);
        clearTimeout(hard);
        try {
          chart.delete();
        } catch (err) {
          /* Session may already be gone after a reconnect. */
        }
      };

      const finish = (err, value) => {
        if (settled) return;
        settled = true;
        cleanup();
        if (err) reject(err);
        else resolve(value);
      };

      const hard = setTimeout(() => finish(new Error('Chart-Zeitüberschreitung')), 15000);

      const publish = () => {
        if (!chart.periods || chart.periods.length === 0) return;
        const built = withIndicators(chart.periods);
        finish(null, {
          symbol,
          timeframe,
          description: chart.infos ? chart.infos.description : '',
          ...built,
        });
      };

      chart.onError((...err) => finish(new Error(errorText(err) || 'Chart-Fehler')));
      chart.onUpdate(() => {
        if (!chart.periods || chart.periods.length === 0) return;
        if (chart.periods.length >= CHART_RANGE) {
          publish();
          return;
        }
        if (quiet) clearTimeout(quiet);
        quiet = setTimeout(publish, 600);
      });

      chart.setMarket(symbol, { timeframe, range: CHART_RANGE });
    });
  }
}

module.exports = {
  TvBridge,
  DEFAULT_WATCHLIST,
  FUNDING_SYMBOLS,
  QUOTE_FIELDS,
};
