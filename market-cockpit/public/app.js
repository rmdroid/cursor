(function cockpit() {
  const lib = window.CockpitLib;
  const DEFAULT_WATCHLIST = [
    'OANDA:XAUUSD',
    'BITSTAMP:BTCUSD',
    'SP:SPX',
    'CME_MINI:ES1!',
    'FX:EURUSD',
    'SIX:NESN',
  ];
  const DEFAULT_LEVELS = {
    'OANDA:XAUUSD': [4000, 4150, 4550],
  };
  const STORE = {
    watchlist: 'mic.watchlist',
    levels: 'mic.levels',
    notes: 'mic.notes',
    overlays: 'mic.overlays',
  };

  const state = {
    quotes: {},
    status: 'connecting',
    error: null,
    selected: DEFAULT_WATCHLIST[0],
    timeframe: 'D',
    overlays: loadOverlays(),
    chart: null,
    chartPayload: null,
    chartKey: '',
    alerts: [],
    lastPrice: {},
    ta: null,
    taSymbol: '',
    dailyCandles: {},
    dailyErrors: {},
    ivCandles: {},
    volaArmed: {},
    volRows: [],
  };

  const els = {
    body: document.getElementById('watch-body'),
    banner: document.getElementById('banner'),
    dot: document.getElementById('status-dot'),
    status: document.getElementById('status-label'),
    funding: document.getElementById('funding'),
    futures: document.getElementById('futures'),
    ta: document.getElementById('ta'),
    metrics: document.getElementById('indicator-values'),
    notes: document.getElementById('notes'),
    snapshot: document.getElementById('snapshot'),
    chips: document.getElementById('level-chips'),
    alerts: document.getElementById('alerts'),
    volatility: document.getElementById('volatility'),
    chart: document.getElementById('chart'),
    chartMessage: document.getElementById('chart-message'),
    chartTitle: document.getElementById('chart-title'),
    copyStatus: document.getElementById('copy-status'),
    search: document.getElementById('search-results'),
    addError: document.getElementById('add-error'),
    addInput: document.getElementById('add-symbol'),
  };

  function loadJson(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      if (raw == null) return fallback;
      return JSON.parse(raw);
    } catch (err) {
      return fallback;
    }
  }

  function loadOverlays() {
    return loadJson(STORE.overlays, {
      sma20: true,
      sma50: true,
      sma200: true,
      rsi: true,
      macd: true,
    });
  }

  function watchlist() {
    const stored = loadJson(STORE.watchlist, null);
    if (!Array.isArray(stored) || stored.length === 0) return DEFAULT_WATCHLIST.slice();
    return stored;
  }

  function saveWatchlist(symbols) {
    localStorage.setItem(STORE.watchlist, JSON.stringify(symbols));
  }

  function levelsMap() {
    const stored = loadJson(STORE.levels, null);
    if (!stored) return JSON.parse(JSON.stringify(DEFAULT_LEVELS));
    return stored;
  }

  function saveLevels(map) {
    localStorage.setItem(STORE.levels, JSON.stringify(map));
  }

  function levelsFor(symbol) {
    const map = levelsMap();
    const rows = Array.isArray(map[symbol]) ? map[symbol] : [];
    return rows.filter((value) => Number.isFinite(Number(value))).map(Number);
  }

  function notesMap() {
    return loadJson(STORE.notes, {}) || {};
  }

  function esc(value) {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function tone(value) {
    if (!Number.isFinite(value) || value === 0) return 'flat';
    return value > 0 ? 'up' : 'down';
  }

  function adviceClass(label) {
    if (!label) return 'neutral';
    if (label.includes('Kauf')) return 'buy';
    if (label.includes('Verkauf')) return 'sell';
    return 'neutral';
  }

  function quoteOf(symbol) {
    return state.quotes[symbol] || {
      symbol,
      name: symbol.split(':')[1] || symbol,
      last: null,
    };
  }

  function applyState(next) {
    state.status = next.status || state.status;
    state.error = next.error || null;
    state.quotes = next.quotes || {};
    checkBreaks();
    render();
  }

  function checkBreaks() {
    const fresh = [];
    watchlist().forEach((symbol) => {
      const quote = state.quotes[symbol];
      if (!quote || !Number.isFinite(quote.last)) return;
      const prev = state.lastPrice[symbol];
      state.lastPrice[symbol] = quote.last;
      if (prev == null || prev === quote.last) return;
      levelsFor(symbol).forEach((level) => {
        const up = prev < level && quote.last >= level;
        const down = prev > level && quote.last <= level;
        if (!up && !down) return;
        fresh.push({
          symbol,
          name: quote.name,
          level,
          direction: up ? 'aufwärts' : 'abwärts',
          price: quote.last,
          at: Date.now(),
        });
      });
    });
    if (!fresh.length) return;
    fresh.forEach((alert) => { alert.kind = 'level'; });
    state.alerts = fresh.concat(state.alerts).slice(0, 8);
  }

  function checkVola(rows) {
    const fresh = [];
    (rows || []).forEach((row) => {
      [
        ['hv', row.hvJump, 'HV20', row.hv20, row.hvBaseline, row.hvChangeRatio],
        ['iv', row.ivJump, row.ivName ? `IV ${row.ivName}` : 'IV', row.iv, row.ivBaseline, row.ivChangeRatio],
      ].forEach(([kind, jumped, metric, value, baseline, ratio]) => {
        const key = `${row.symbol}:${kind}`;
        if (!jumped) {
          delete state.volaArmed[key];
          return;
        }
        if (state.volaArmed[key]) return;
        state.volaArmed[key] = true;
        fresh.push({
          kind: 'vola',
          symbol: row.symbol,
          name: row.label,
          metric,
          value,
          baseline,
          ratio,
          at: Date.now(),
        });
      });
    });
    if (!fresh.length) return;
    state.alerts = fresh.concat(state.alerts).slice(0, 8);
  }

  function renderStatus() {
    els.dot.className = `dot ${state.status}`;
    const labels = { live: 'Live', connecting: 'Verbinde', error: 'Getrennt' };
    els.status.textContent = labels[state.status] || state.status;
    if (state.status === 'error') {
      els.banner.hidden = false;
      els.banner.textContent = `Verbindung zur TradingView-Schnittstelle fehlgeschlagen${state.error ? `: ${state.error}` : ''}. Kurse können fehlen. Neu verbinden versucht den Socket erneut.`;
    } else {
      els.banner.hidden = true;
    }
  }

  function renderWatchlist() {
    const symbols = watchlist();
    if (!symbols.includes(state.selected)) state.selected = symbols[0] || '';
    els.body.innerHTML = symbols.map((symbol) => {
      const quote = quoteOf(symbol);
      const digits = lib.decimalsFor(quote);
      const range = `${lib.formatNumber(quote.dayLow, digits)} – ${lib.formatNumber(quote.dayHigh, digits)}`;
      const year = `${lib.formatNumber(quote.low52, digits)} – ${lib.formatNumber(quote.high52, digits)}`;
      const err = quote.error ? `<small>${esc(quote.error)}</small>` : `<small>${esc(quote.description || symbol)}</small>`;
      return `<tr data-symbol="${esc(symbol)}" class="${symbol === state.selected ? 'selected' : ''}">
        <td class="sym">${esc(quote.name)} ${err}</td>
        <td>${esc(lib.formatNumber(quote.last, digits))}</td>
        <td class="${tone(quote.changePct)}">${esc(lib.formatPct(quote.changePct))}</td>
        <td>${esc(range)}</td>
        <td>${esc(year)}</td>
        <td>${esc(lib.formatClock(quote.updatedAt))}</td>
        <td><button type="button" class="icon-btn" data-remove="${esc(symbol)}" aria-label="Entfernen">×</button></td>
      </tr>`;
    }).join('');
  }

  function renderFunding() {
    const slots = lib.buildFunding(state.quotes);
    els.funding.innerHTML = slots.map((slot) => {
      if (!slot.available) {
        return `<article class="slot stub"><div>${esc(slot.label)}</div><p class="reason"><strong>unavailable via TV API</strong> — ${esc(String(slot.reason).replace(/^unavailable via TV API — /, ''))}</p></article>`;
      }
      if (slot.unit === 'bp') {
        return `<article class="slot"><div>${esc(slot.label)}</div><div><strong>${esc(lib.formatNumber(slot.value, 1))} bp</strong><div class="reason">${esc(slot.note || '')}</div></div></article>`;
      }
      const digits = lib.decimalsFor(slot.quote);
      const pct = lib.formatPct(slot.quote.changePct);
      return `<article class="slot"><div>${esc(slot.label)}</div><div><strong class="${tone(slot.quote.changePct)}">${esc(lib.formatNumber(slot.quote.last, digits))}%</strong> <span class="${tone(slot.quote.changePct)}">${esc(pct)}</span><div class="reason">${esc(slot.symbol)}${slot.note ? ` · ${esc(slot.note)}` : ''}</div></div></article>`;
    }).join('');
  }

  function renderFutures() {
    const hint = lib.futuresFor(state.selected);
    if (!hint) {
      els.futures.innerHTML = '<p>Kein Futures-Hinweis. Nur der E-mini <strong>CME_MINI:ES1!</strong> hat in v1 einen Frontmonat und letzten Handelstag.</p>';
      return;
    }
    els.futures.innerHTML = `<p><strong>${esc(hint.code)}</strong> · letzter Handelstag ${esc(lib.formatIsoDate(hint.lastTradeDay))}</p><p>Kurs über ${esc(hint.continuousSymbol)}. ${esc(hint.note)}</p>`;
  }

  function renderLevels() {
    const quote = quoteOf(state.selected);
    const hit = new Set(state.alerts.filter((alert) => Date.now() - alert.at < 8000).map((alert) => alert.level));
    els.chips.innerHTML = levelsFor(state.selected).slice().sort((a, b) => a - b).map((level) => {
      const side = Number.isFinite(quote.last) && level <= quote.last ? 'support' : 'resistance';
      const tag = side === 'support' ? 'S' : 'R';
      const digits = lib.decimalsFor({ ...quote, last: level });
      return `<span class="chip ${side} ${hit.has(level) ? 'hit' : ''}">${esc(lib.formatNumber(level, digits))} ${tag}<button type="button" class="icon-btn" data-level="${level}" aria-label="Marke entfernen">×</button></span>`;
    }).join('');
    els.alerts.innerHTML = state.alerts.map((alert) => {
      if (alert.kind === 'vola') {
        const move = lib.formatPct((alert.ratio || 0) * 100);
        return `<li>${esc(lib.formatClock(alert.at))} Vola-Sprung ${esc(alert.name)} ${esc(alert.metric)} ${esc(lib.formatVol(alert.value))} · ${esc(move)} ggü. 5-Tage-Mittel ${esc(lib.formatVol(alert.baseline))}</li>`;
      }
      const digits = lib.decimalsFor(quoteOf(alert.symbol));
      return `<li>${esc(lib.formatClock(alert.at))} ${esc(alert.name)} Bruch ${esc(lib.formatNumber(alert.level, digits))} ${esc(alert.direction)} · ${esc(lib.formatNumber(alert.price, digits))}</li>`;
    }).join('');
  }

  function volatilityFeeds() {
    const feeds = lib.VOLATILITY_FEEDS.slice();
    if (state.selected && !feeds.some((feed) => feed.symbol === state.selected)) {
      const quote = quoteOf(state.selected);
      feeds.unshift({
        symbol: state.selected,
        label: quote.name || state.selected,
        ivSymbol: null,
        ivName: null,
        ivReason: 'Kein IV-Index für dieses Symbol.',
      });
    }
    return feeds;
  }

  function volatilityRows() {
    return volatilityFeeds().map((feed) => {
      const known = Object.prototype.hasOwnProperty.call(state.dailyCandles, feed.symbol);
      const candles = known ? state.dailyCandles[feed.symbol] : null;
      const closes = candles ? candles.map((candle) => candle.close) : null;
      let ivCloses = null;
      if (feed.ivSymbol && Object.prototype.hasOwnProperty.call(state.ivCandles, feed.ivSymbol)) {
        ivCloses = (state.ivCandles[feed.ivSymbol] || []).map((candle) => candle.close);
      }
      const ivQuote = feed.ivSymbol ? state.quotes[feed.ivSymbol] : null;
      return lib.buildVolatilityRow(feed, {
        closes,
        ivCloses,
        ivLast: ivQuote && Number.isFinite(ivQuote.last) ? ivQuote.last : null,
        ivError: ivQuote && ivQuote.error ? ivQuote.error : null,
        dailyError: state.dailyErrors[feed.symbol] || null,
      });
    });
  }

  function renderVolatility() {
    const rows = state.volRows || [];
    if (!rows.length) {
      els.volatility.textContent = 'Wird geladen…';
      return;
    }
    const body = rows.map((row) => {
      const hv = row.hvPending
        ? '…'
        : lib.formatVol(row.hv20);
      const hvDetail = row.hvBaseline != null
        ? `<small>5T ${esc(lib.formatVol(row.hvBaseline))}</small>`
        : (row.dailyError ? `<small>${esc(row.dailyError)}</small>` : '');
      let ivCell;
      if (row.ivPending) ivCell = '…';
      else if (row.ivAvailable) {
        const base = row.ivBaseline != null ? `<small>5T ${esc(lib.formatVol(row.ivBaseline))}</small>` : '';
        ivCell = `<span class="${row.ivJump ? 'jump' : ''}">${esc(lib.formatVol(row.iv))}${row.ivJump ? ' ↑' : ''}</span> <small>${esc(row.ivName || row.ivSymbol || '')}</small>${base}`;
      } else {
        const detail = String(row.ivReason || '').replace(/^unavailable via TV API — /, '');
        ivCell = `<span class="iv-missing"><strong>unavailable via TV API</strong><small>${esc(detail)}</small></span>`;
      }
      return `<tr class="${row.symbol === state.selected ? 'vol-selected' : ''}">
        <td>${esc(row.label)}<small>${esc(row.symbol)}</small></td>
        <td class="${row.hvJump ? 'jump' : ''}">${esc(hv)}${row.hvJump ? ' ↑' : ''}${hvDetail}</td>
        <td>${ivCell}</td>
      </tr>`;
    }).join('');
    els.volatility.innerHTML = `<table class="vol-table"><thead><tr><th>Markt</th><th>HV20</th><th>IV</th></tr></thead><tbody>${body}</tbody></table>`;
  }

  function renderSnapshot() {
    const snapshot = lib.buildSnapshot({
      watchlist: watchlist(),
      quotes: state.quotes,
      volatility: (state.volRows || []).filter((row) => (
        lib.VOLATILITY_FEEDS.some((feed) => feed.symbol === row.symbol)
      )),
    });
    els.snapshot.textContent = snapshot.lines.join('\n');
  }

  function renderMetrics() {
    const last = state.chartPayload && state.chartPayload.symbol === state.selected
      ? state.chartPayload.last
      : null;
    const digits = lib.decimalsFor(quoteOf(state.selected));
    const rows = [
      ['SMA20', last && last.sma20],
      ['SMA50', last && last.sma50],
      ['SMA200', last && last.sma200],
      ['RSI14', last && last.rsi14],
      ['MACD', last && last.macd],
      ['Signal', last && last.signal],
      ['Hist', last && last.histogram],
    ];
    els.metrics.innerHTML = rows.map(([label, value]) => {
      const places = label === 'RSI14' ? 2 : digits;
      return `<dt>${label}</dt><dd>${esc(lib.formatNumber(value, places))}</dd>`;
    }).join('');
    const notes = notesMap();
    if (document.activeElement !== els.notes) {
      els.notes.value = notes[state.selected] || '';
    }
  }

  function renderTa() {
    if (!state.ta || state.taSymbol !== state.selected) {
      els.ta.textContent = 'Einschätzung wird geladen…';
      return;
    }
    const ta = state.ta;
    if (!ta) {
      els.ta.textContent = 'Keine TV-Einschätzung für dieses Symbol.';
      return;
    }
    const line = (title, row) => {
      if (!row) return '';
      return `<p>${title}: <span class="advice ${adviceClass(row.allLabel)}">Gesamt ${esc(row.allLabel)}</span> · <span class="advice ${adviceClass(row.maLabel)}">MA ${esc(row.maLabel)}</span> · <span class="advice ${adviceClass(row.otherLabel)}">Osz. ${esc(row.otherLabel)}</span></p>`;
    };
    els.ta.innerHTML = `${line('Tag', ta['1D'])}${line('Woche', ta['1W'])}<p class="muted">Scanner-Empfehlung über getTA. Kein Handelssignal.</p>`;
  }

  function decorationKey() {
    const payload = state.chartPayload;
    const quote = quoteOf(state.selected);
    const sides = levelsFor(state.selected).map((level) => (
      Number.isFinite(quote.last) && level <= quote.last ? 'S' : 'R'
    )).join('');
    const stamp = payload ? `${payload.symbol}|${payload.timeframe}|${payload.candles.length}|${payload.candles.at(-1) && payload.candles.at(-1).close}` : 'none';
    return [
      state.selected,
      state.timeframe,
      stamp,
      JSON.stringify(state.overlays),
      levelsFor(state.selected).join(','),
      sides,
    ].join('~');
  }

  function renderChart(fit) {
    if (state.chart) {
      state.chart.remove();
      state.chart = null;
    }
    const payload = state.chartPayload;
    const matches = payload && payload.symbol === state.selected && payload.timeframe === state.timeframe;
    if (!matches || !window.LightweightCharts || !payload.candles.length) return;
    const chart = LightweightCharts.createChart(els.chart, {
      autoSize: true,
      layout: {
        background: { color: '#10161e' },
        textColor: '#9aabbd',
        panes: { separatorColor: '#243041', separatorHoverColor: '#e0b15a' },
      },
      grid: {
        vertLines: { color: '#1c2733' },
        horzLines: { color: '#1c2733' },
      },
      rightPriceScale: { borderColor: '#243041' },
      timeScale: { borderColor: '#243041' },
      crosshair: { mode: 0 },
    });
    const digits = lib.decimalsFor(quoteOf(state.selected));
    const candles = chart.addSeries(LightweightCharts.CandlestickSeries, {
      upColor: '#1f8f5f',
      downColor: '#d4536a',
      borderVisible: false,
      wickUpColor: '#3dd68c',
      wickDownColor: '#ff5d73',
      priceFormat: { type: 'price', precision: digits, minMove: 10 ** -digits },
    }, 0);
    candles.setData(payload.candles);
    const addLine = (data, color, pane, precision) => {
      if (!state.overlays || !data || !data.length) return;
      const series = chart.addSeries(LightweightCharts.LineSeries, {
        color,
        lineWidth: 2,
        priceLineVisible: false,
        lastValueVisible: false,
        priceFormat: { type: 'price', precision: precision ?? digits, minMove: 10 ** -(precision ?? digits) },
      }, pane);
      series.setData(data);
      return series;
    };
    if (state.overlays.sma20) addLine(payload.overlays.sma20, '#e0b15a', 0);
    if (state.overlays.sma50) addLine(payload.overlays.sma50, '#7aa2f7', 0);
    if (state.overlays.sma200) addLine(payload.overlays.sma200, '#c792ea', 0);
    let nextPane = 1;
    if (state.overlays.rsi && payload.overlays.rsi14.length) {
      addLine(payload.overlays.rsi14, '#7aa2f7', nextPane, 2);
      const pane = chart.panes()[nextPane];
      if (pane) pane.setHeight(72);
      nextPane += 1;
    }
    if (state.overlays.macd && payload.overlays.macd.length) {
      const hist = chart.addSeries(LightweightCharts.HistogramSeries, {
        priceLineVisible: false,
        lastValueVisible: false,
        priceFormat: { type: 'price', precision: 4, minMove: 0.0001 },
      }, nextPane);
      hist.setData(payload.overlays.macdHist.map((point) => ({
        time: point.time,
        value: point.value,
        color: point.value >= 0 ? 'rgba(31,143,95,0.75)' : 'rgba(212,83,106,0.8)',
      })));
      addLine(payload.overlays.macd, '#7ec8c3', nextPane, 4);
      addLine(payload.overlays.macdSignal, '#e0b15a', nextPane, 4);
      const pane = chart.panes()[nextPane];
      if (pane) pane.setHeight(84);
    }
    const quote = quoteOf(state.selected);
    levelsFor(state.selected).forEach((level) => {
      const support = Number.isFinite(quote.last) && level <= quote.last;
      candles.createPriceLine({
        price: level,
        color: support ? '#6ea8fe' : '#e0b15a',
        lineWidth: 1,
        lineStyle: 2,
        axisLabelVisible: true,
        title: support ? 'S' : 'R',
      });
    });
    if (fit) chart.timeScale().fitContent();
    state.chart = chart;
    state.chartKey = decorationKey();
  }

  function maybeRedrawChart() {
    const key = decorationKey();
    if (state.chart && key === state.chartKey) return;
    renderChart(false);
  }

  function render() {
    const quote = quoteOf(state.selected);
    els.chartTitle.textContent = quote.description
      ? `${quote.name} · ${quote.description}`
      : (quote.name || 'Chart');
    state.volRows = volatilityRows();
    checkVola(state.volRows);
    renderStatus();
    renderWatchlist();
    renderFunding();
    renderFutures();
    renderLevels();
    renderSnapshot();
    renderMetrics();
    renderVolatility();
    renderTa();
    maybeRedrawChart();
  }

  async function syncWatchlist(symbols) {
    saveWatchlist(symbols);
    const response = await fetch('/api/subscriptions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ symbols }),
    });
    const body = await response.json();
    if (!response.ok) throw new Error(body.error || 'Abo fehlgeschlagen');
    if (body.rejected && body.rejected.length) {
      const rejected = new Set(body.rejected.map((item) => String(item).toUpperCase()));
      saveWatchlist(symbols.filter((item) => !rejected.has(String(item).toUpperCase())));
      els.addError.hidden = false;
      els.addError.textContent = `Nicht übernommen: ${body.rejected.join(', ')}. Erwartet wird EXCHANGE:SYMBOL.`;
    } else {
      els.addError.hidden = true;
    }
    return body;
  }

  async function loadChart(forceFit) {
    if (!state.selected) return;
    els.chartMessage.hidden = false;
    els.chartMessage.textContent = 'Kerzen werden geladen…';
    try {
      const response = await fetch(`/api/chart?symbol=${encodeURIComponent(state.selected)}&timeframe=${state.timeframe}`);
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || 'Chart fehlgeschlagen');
      if (body.symbol !== state.selected || body.timeframe !== state.timeframe) return;
      state.chartPayload = body;
      if (body.timeframe === 'D' && Array.isArray(body.candles)) {
        state.dailyCandles[body.symbol] = body.candles;
        delete state.dailyErrors[body.symbol];
      }
      els.chartMessage.hidden = true;
      renderMetrics();
      renderChart(forceFit !== false);
    } catch (err) {
      els.chartMessage.hidden = false;
      els.chartMessage.textContent = err.message || 'Chart nicht verfügbar';
    }
  }

  async function loadTa() {
    const symbol = state.selected;
    if (!symbol) return;
    state.taSymbol = symbol;
    state.ta = null;
    renderTa();
    try {
      const response = await fetch(`/api/ta?symbol=${encodeURIComponent(symbol)}`);
      const body = await response.json();
      if (symbol !== state.selected) return;
      state.ta = response.ok ? body.ta : null;
      if (!response.ok) state.ta = null;
      renderTa();
    } catch (err) {
      if (symbol !== state.selected) return;
      els.ta.textContent = 'TV-Einschätzung nicht erreichbar.';
    }
  }

  function selectSymbol(symbol) {
    if (symbol === state.selected) return;
    state.selected = symbol;
    state.chartPayload = null;
    render();
    loadChart(true);
    loadTa();
    if (symbol && !Object.prototype.hasOwnProperty.call(state.dailyCandles, symbol)) {
      fetchDaily(symbol).then((candles) => {
        state.dailyCandles[symbol] = candles;
        delete state.dailyErrors[symbol];
        render();
      }).catch((err) => {
        state.dailyCandles[symbol] = [];
        state.dailyErrors[symbol] = err.message || 'Tageskerzen fehlen';
        render();
      });
    }
  }

  function coreVolatility() {
    return (state.volRows || []).filter((row) => (
      lib.VOLATILITY_FEEDS.some((feed) => feed.symbol === row.symbol)
    ));
  }

  function exportModel() {
    const symbols = watchlist();
    const levels = {};
    symbols.forEach((symbol) => {
      levels[symbol] = levelsFor(symbol);
    });
    const volatility = state.volRows || [];
    return {
      exportedAt: new Date().toISOString(),
      source: 'unofficial @mathieuc/tradingview',
      disclaimer: 'Not official TradingView. No order routing.',
      volatilityMethod: 'HV20 close-to-close, sample stdev of log returns, sqrt(252), percent. IV is a verified index quote only. Jump when the latest value is at least 30% above the mean of the previous 5 readings.',
      snapshot: lib.buildSnapshot({
        watchlist: symbols,
        quotes: state.quotes,
        volatility: coreVolatility(),
      }).lines,
      quotes: symbols.map((symbol) => quoteOf(symbol)),
      volatility,
      levels,
      funding: lib.buildFunding(state.quotes),
      futures: lib.esFrontMonth(new Date()),
    };
  }

  function csvField(value) {
    const text = value == null ? '' : String(value);
    if (/[",\n]/.test(text)) return `"${text.replace(/"/g, '""')}"`;
    return text;
  }

  function volBySymbol(model) {
    const map = {};
    (model.volatility || []).forEach((row) => { map[row.symbol] = row; });
    return map;
  }

  function volCells(row) {
    if (!row) return ['', '', '', ''];
    return [
      row.hvPending ? '' : row.hv20,
      row.ivAvailable ? row.iv : '',
      row.ivSymbol || '',
      row.ivAvailable ? 'live' : (row.ivPending ? 'pending' : 'unavailable'),
    ];
  }

  function toCsv(model) {
    const header = ['section', 'symbol', 'name', 'last', 'change_pct', 'day_high', 'day_low', 'high_52w', 'low_52w', 'currency', 'updated_at', 'levels', 'detail', 'hv20', 'iv', 'iv_symbol', 'iv_status'];
    const rows = [header];
    const vol = volBySymbol(model);
    model.quotes.forEach((quote) => {
      const row = vol[quote.symbol];
      rows.push([
        'quote', quote.symbol, quote.name, quote.last, quote.changePct, quote.dayHigh, quote.dayLow,
        quote.high52, quote.low52, quote.currency, quote.updatedAt,
        (model.levels[quote.symbol] || []).join('|'), quote.error || quote.description || '',
        ...volCells(row),
      ]);
    });
    (model.volatility || []).forEach((row) => {
      rows.push([
        'volatility', row.symbol, row.label, row.hv20, row.hvChangeRatio, '', '', '', '', '', '',
        row.ivJump || row.hvJump ? 'jump' : '',
        row.ivAvailable ? `${row.ivName || ''} ${row.iv}` : (row.ivReason || ''),
        ...volCells(row),
      ]);
    });
    model.funding.forEach((slot) => {
      rows.push([
        'funding', slot.symbol || '', slot.label,
        slot.available ? (slot.unit === 'bp' ? slot.value : slot.quote.last) : '',
        slot.quote ? slot.quote.changePct : '', '', '', '', '', '', '',
        '', slot.available ? (slot.note || slot.unit || '') : slot.reason,
        '', '', '', '',
      ]);
    });
    model.snapshot.forEach((line) => {
      rows.push(['snapshot', '', '', '', '', '', '', '', '', '', '', '', line, '', '', '', '']);
    });
    return rows.map((row) => row.map(csvField).join(',')).join('\n');
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      const area = document.createElement('textarea');
      area.value = text;
      document.body.appendChild(area);
      area.select();
      document.execCommand('copy');
      area.remove();
    }
    els.copyStatus.textContent = 'Kopiert';
    setTimeout(() => {
      if (els.copyStatus.textContent === 'Kopiert') els.copyStatus.textContent = '';
    }, 2500);
  }

  function bind() {
    document.getElementById('reconnect').addEventListener('click', async () => {
      state.status = 'connecting';
      renderStatus();
      const response = await fetch('/api/reconnect', { method: 'POST' });
      applyState(await response.json());
      loadChart(true);
    });

    document.getElementById('copy-json').addEventListener('click', () => {
      copyText(JSON.stringify(exportModel(), null, 2));
    });
    document.getElementById('copy-csv').addEventListener('click', () => {
      copyText(toCsv(exportModel()));
    });

    els.body.addEventListener('click', async (event) => {
      const remove = event.target.closest('[data-remove]');
      if (remove) {
        event.stopPropagation();
        const next = watchlist().filter((symbol) => symbol !== remove.dataset.remove);
        await syncWatchlist(next);
        if (state.selected === remove.dataset.remove) selectSymbol(next[0] || '');
        render();
        return;
      }
      const row = event.target.closest('tr[data-symbol]');
      if (row) selectSymbol(row.dataset.symbol);
    });

    document.getElementById('add-form').addEventListener('submit', async (event) => {
      event.preventDefault();
      const symbol = els.addInput.value.trim().toUpperCase();
      if (!symbol) return;
      const next = watchlist();
      if (!next.includes(symbol)) next.push(symbol);
      await syncWatchlist(next);
      els.addInput.value = '';
      els.search.hidden = true;
      selectSymbol(symbol);
    });

    let searchTimer = null;
    els.addInput.addEventListener('input', () => {
      clearTimeout(searchTimer);
      const q = els.addInput.value.trim();
      if (q.length < 2) {
        els.search.hidden = true;
        return;
      }
      searchTimer = setTimeout(async () => {
        const response = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
        const rows = await response.json();
        if (!Array.isArray(rows) || !rows.length) {
          els.search.hidden = true;
          return;
        }
        els.search.hidden = false;
        els.search.innerHTML = rows.map((row) => (
          `<li><button type="button" data-pick="${esc(row.id)}">${esc(row.id)} · ${esc(row.description || '')}</button></li>`
        )).join('');
      }, 250);
    });

    els.search.addEventListener('click', async (event) => {
      const button = event.target.closest('[data-pick]');
      if (!button) return;
      const symbol = button.dataset.pick;
      const next = watchlist();
      if (!next.includes(symbol)) next.push(symbol);
      await syncWatchlist(next);
      els.addInput.value = '';
      els.search.hidden = true;
      selectSymbol(symbol);
    });

    document.querySelectorAll('[data-timeframe]').forEach((button) => {
      button.addEventListener('click', () => {
        state.timeframe = button.dataset.timeframe;
        document.querySelectorAll('[data-timeframe]').forEach((item) => {
          item.classList.toggle('on', item === button);
        });
        state.chartPayload = null;
        loadChart(true);
      });
    });

    document.querySelectorAll('[data-overlay]').forEach((input) => {
      input.checked = Boolean(state.overlays[input.dataset.overlay]);
      input.addEventListener('change', () => {
        state.overlays[input.dataset.overlay] = input.checked;
        localStorage.setItem(STORE.overlays, JSON.stringify(state.overlays));
        renderChart(false);
      });
    });

    document.getElementById('reload-chart').addEventListener('click', () => loadChart(true));

    document.getElementById('level-form').addEventListener('submit', (event) => {
      event.preventDefault();
      const input = document.getElementById('level-input');
      const level = Number(input.value);
      if (!Number.isFinite(level) || !state.selected) return;
      const map = levelsMap();
      const rows = levelsFor(state.selected);
      if (!rows.includes(level)) rows.push(level);
      map[state.selected] = rows;
      saveLevels(map);
      input.value = '';
      renderLevels();
      renderChart(false);
    });

    els.chips.addEventListener('click', (event) => {
      const button = event.target.closest('[data-level]');
      if (!button) return;
      const level = Number(button.dataset.level);
      const map = levelsMap();
      map[state.selected] = levelsFor(state.selected).filter((value) => value !== level);
      saveLevels(map);
      renderLevels();
      renderChart(false);
    });

    els.notes.addEventListener('input', () => {
      const notes = notesMap();
      notes[state.selected] = els.notes.value;
      localStorage.setItem(STORE.notes, JSON.stringify(notes));
    });
  }

  async function boot() {
    bind();
    render();
    try {
      await syncWatchlist(watchlist());
    } catch (err) {
      els.addError.hidden = false;
      els.addError.textContent = err.message;
    }
    try {
      const response = await fetch('/api/state');
      applyState(await response.json());
    } catch (err) {
      state.status = 'error';
      state.error = 'Server nicht erreichbar';
      renderStatus();
    }
    const events = new EventSource('/api/events');
    events.onmessage = (event) => {
      applyState(JSON.parse(event.data));
    };
    events.onerror = () => {
      if (state.status !== 'error') {
        state.status = 'error';
        state.error = state.error || 'Ereignisstrom unterbrochen';
        renderStatus();
      }
    };
    loadChart(true).finally(() => refreshVolatility());
    loadTa();
    setInterval(() => {
      if (document.visibilityState === 'hidden') return;
      loadChart(false);
      refreshVolatility();
    }, 60000);
  }

  async function fetchDaily(symbol) {
    const response = await fetch(`/api/chart?symbol=${encodeURIComponent(symbol)}&timeframe=D`);
    const body = await response.json();
    if (!response.ok) throw new Error(body.error || 'Chart fehlgeschlagen');
    return body.candles || [];
  }

  async function refreshVolatility() {
    const symbols = new Set(lib.VOLATILITY_FEEDS.map((feed) => feed.symbol));
    if (state.selected) symbols.add(state.selected);
    const ivSymbols = lib.VOLATILITY_FEEDS.map((feed) => feed.ivSymbol).filter(Boolean);
    const jobs = [];
    symbols.forEach((symbol) => {
      jobs.push(fetchDaily(symbol).then((candles) => {
        state.dailyCandles[symbol] = candles;
        delete state.dailyErrors[symbol];
      }).catch((err) => {
        if (!state.dailyCandles[symbol]) state.dailyCandles[symbol] = [];
        state.dailyErrors[symbol] = err.message || 'Tageskerzen fehlen';
      }));
    });
    ivSymbols.forEach((symbol) => {
      jobs.push(fetchDaily(symbol).then((candles) => {
        state.ivCandles[symbol] = candles;
      }).catch(() => {
        if (!state.ivCandles[symbol]) state.ivCandles[symbol] = [];
      }));
    });
    await Promise.all(jobs);
    render();
  }

  boot();
}());
