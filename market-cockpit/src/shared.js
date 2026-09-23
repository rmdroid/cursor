/**
 * Pure helpers shared by the server tests and the browser UI.
 * Quote fields and symbol choices were checked against @mathieuc/tradingview 3.5.2.
 */
(function sharedModule(root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.CockpitLib = api;
}(typeof window !== 'undefined' ? window : null, () => {
  const QUARTER_MONTHS = [
    { month: 3, code: 'H' },
    { month: 6, code: 'M' },
    { month: 9, code: 'U' },
    { month: 12, code: 'Z' },
  ];

  const ES_SYMBOL = 'CME_MINI:ES1!';

  function nthSunday(year, monthIndex, n) {
    const first = new Date(Date.UTC(year, monthIndex, 1));
    const dow = first.getUTCDay();
    return 1 + ((7 - dow) % 7) + (n - 1) * 7;
  }

  function isNewYorkDst(year, month, day) {
    if (month < 3 || month > 11) return false;
    if (month > 3 && month < 11) return true;
    if (month === 3) return day >= nthSunday(year, 2, 2);
    return day < nthSunday(year, 10, 1);
  }

  function thirdFriday(year, month) {
    const first = new Date(Date.UTC(year, month - 1, 1));
    const dow = first.getUTCDay();
    const firstFriday = 1 + ((5 - dow + 7) % 7);
    return firstFriday + 14;
  }

  function esFrontMonth(now = new Date()) {
    const t = now.getTime();
    const year = now.getUTCFullYear();
    const candidates = [];
    for (let y = year - 1; y <= year + 1; y += 1) {
      QUARTER_MONTHS.forEach((quarter) => {
        const day = thirdFriday(y, quarter.month);
        const utcHour = isNewYorkDst(y, quarter.month, day) ? 13 : 14;
        const lastTradeMs = Date.UTC(y, quarter.month - 1, day, utcHour, 30, 0);
        candidates.push({
          code: `ES${quarter.code}${y}`,
          month: quarter.month,
          year: y,
          lastTradeMs,
          lastTradeDay: new Date(Date.UTC(y, quarter.month - 1, day)).toISOString().slice(0, 10),
          continuousSymbol: ES_SYMBOL,
          note: 'Kalenderhinweis, kein Verfallsfeld der TV-Quote. E-mini S&P 500: letzter Handelstag ist der 3. Freitag, 09:30 New York. Kein Optionsboard.',
        });
      });
    }
    candidates.sort((a, b) => a.lastTradeMs - b.lastTradeMs);
    return candidates.find((item) => item.lastTradeMs >= t) || candidates[candidates.length - 1];
  }

  function futuresFor(symbol, now = new Date()) {
    if (symbol === ES_SYMBOL) return esFrontMonth(now);
    return null;
  }

  function sessionDate(unixSeconds) {
    const d = new Date(unixSeconds * 1000);
    if (d.getUTCHours() >= 18) d.setUTCDate(d.getUTCDate() + 1);
    const y = d.getUTCFullYear();
    const m = String(d.getUTCMonth() + 1).padStart(2, '0');
    const day = String(d.getUTCDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  function zurichParts(now) {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/Zurich',
      weekday: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
    });
    return Object.fromEntries(fmt.formatToParts(now).map((part) => [part.type, part.value]));
  }

  function sessionMode(now = new Date()) {
    const parts = zurichParts(now);
    const weekday = parts.weekday;
    const minutes = Number(parts.hour) * 60 + Number(parts.minute);
    if (weekday === 'Sat' || weekday === 'Sun' || minutes >= 22 * 60) return 'Close';
    if (minutes < 15 * 60 + 30) return 'Pre-Market';
    return 'Laufend';
  }

  function clockLabel(now = new Date()) {
    const fmt = new Intl.DateTimeFormat('de-CH', {
      timeZone: 'Europe/Zurich',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
    });
    return `${fmt.format(now)} Zürich`;
  }

  function decimalsFor(quote) {
    const scale = Number(quote && quote.pricescale);
    if (Number.isFinite(scale) && scale >= 1) {
      const digits = Math.round(Math.log10(scale));
      if (digits >= 0 && digits <= 8) return digits;
    }
    const last = quote && quote.last;
    if (!Number.isFinite(last)) return 2;
    const abs = Math.abs(last);
    if (abs >= 100) return 2;
    if (abs >= 10) return 3;
    if (abs >= 1) return 4;
    return 5;
  }

  function formatNumber(value, digits) {
    if (!Number.isFinite(value)) return 'n/v';
    return value.toLocaleString('de-DE', {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    });
  }

  function formatCompact(value, digits) {
    if (!Number.isFinite(value)) return 'n/v';
    return value.toFixed(digits).replace('.', ',');
  }

  function formatPct(value) {
    if (!Number.isFinite(value)) return 'n/v';
    const sign = value > 0 ? '+' : '';
    return `${sign}${value.toLocaleString('de-DE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}%`;
  }

  function formatIsoDate(iso) {
    if (!iso) return 'n/v';
    const [y, m, d] = iso.split('-');
    return `${d}.${m}.${y}`;
  }

  function formatClock(ms) {
    if (!ms) return '—';
    return new Intl.DateTimeFormat('de-CH', {
      timeZone: 'Europe/Zurich',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hourCycle: 'h23',
    }).format(new Date(ms));
  }

  function unavailable(id, label, reason, symbol) {
    return {
      id,
      label,
      symbol: symbol || null,
      available: false,
      reason: `unavailable via TV API — ${reason}`,
    };
  }

  function bondSlot(id, label, symbol, quote) {
    if (quote && Number.isFinite(quote.last)) {
      return {
        id,
        label,
        symbol,
        available: true,
        quote,
        unit: '%',
      };
    }
    return unavailable(id, label, `${symbol} liefert ohne Session keinen Last.`, symbol);
  }

  function buildFunding(quotes = {}) {
    const sofr = quotes['FRED:SOFR'];
    const de02 = quotes['TVC:DE02Y'];
    const de10 = quotes['TVC:DE10Y'];
    const fr10 = quotes['TVC:FR10Y'];
    const sofrSlot = sofr && Number.isFinite(sofr.last)
      ? {
        id: 'sofr',
        label: 'SOFR',
        symbol: 'FRED:SOFR',
        available: true,
        quote: sofr,
        unit: '%',
        note: 'FRED:SOFR, oft nur ein Tageswert',
      }
      : unavailable(
        'sofr',
        'SOFR',
        'FRED:SOFR ist gelistet, anonyme Quote ohne Last, Chart: permission denied.',
        'FRED:SOFR',
      );

    let spread;
    if (de10 && fr10 && Number.isFinite(de10.last) && Number.isFinite(fr10.last)) {
      spread = {
        id: 'oat-bund',
        label: 'OAT–Bund',
        available: true,
        computed: true,
        value: (fr10.last - de10.last) * 100,
        unit: 'bp',
        note: 'TVC:FR10Y minus TVC:DE10Y, in Basispunkten',
      };
    } else {
      spread = unavailable('oat-bund', 'OAT–Bund', 'Spread braucht TVC:FR10Y und TVC:DE10Y.');
    }

    return [
      unavailable(
        'estr',
        '€STR',
        'Kein €STR-Fixing in der Symbolsuche. CME:ESR1! ist der ESTR-Future, nicht der Tages-Fixing.',
      ),
      sofrSlot,
      unavailable(
        'saron',
        'SARON',
        'Kein SARON-Overnight-Fixing in der Symbolsuche. Gelistet sind nur SARON-Futures, nicht der Satz.',
      ),
      bondSlot('de02y', 'Bund 2Y', 'TVC:DE02Y', de02),
      bondSlot('de10y', 'Bund 10Y', 'TVC:DE10Y', de10),
      bondSlot('fr10y', 'OAT 10Y', 'TVC:FR10Y', fr10),
      spread,
    ];
  }

  function quoteChunk(symbol, quote, futures) {
    const name = (quote && quote.name) || symbol.split(':')[1] || symbol;
    const digits = decimalsFor(quote);
    let text = `${name} ${formatCompact(quote && quote.last, digits)} ${formatPct(quote && quote.changePct)} T ${formatCompact(quote && quote.dayLow, digits)}-${formatCompact(quote && quote.dayHigh, digits)} 52W ${formatCompact(quote && quote.low52, digits)}-${formatCompact(quote && quote.high52, digits)}`;
    if (futures) {
      text += ` Front ${futures.code} LTD ${formatIsoDate(futures.lastTradeDay)}`;
    }
    return text;
  }

  function packLines(parts, maxLines, maxLen = 168) {
    const lines = [];
    let current = '';
    parts.forEach((part, index) => {
      if (!current) {
        current = part;
        return;
      }
      const next = `${current} · ${part}`;
      const room = maxLines - lines.length;
      if (next.length > maxLen && room > 1) {
        lines.push(current);
        current = part;
        return;
      }
      current = next;
      if (index === parts.length - 1) return;
    });
    if (current) lines.push(current);
    if (lines.length <= maxLines) return lines;
    const head = lines.slice(0, maxLines - 1);
    head.push(lines.slice(maxLines - 1).join(' · '));
    return head;
  }

  function fundingSummary(slots) {
    const missingRates = slots
      .filter((slot) => ['estr', 'sofr', 'saron'].includes(slot.id) && !slot.available)
      .map((slot) => slot.label);
    const pieces = [];
    if (missingRates.length) pieces.push(`${missingRates.join('/')} unavailable via TV API`);
    slots.forEach((slot) => {
      if (['estr', 'sofr', 'saron'].includes(slot.id) && !slot.available) return;
      if (!slot.available) {
        pieces.push(`${slot.label} n/v`);
        return;
      }
      if (slot.unit === 'bp') {
        pieces.push(`${slot.label} ${formatNumber(slot.value, 1)} bp`);
        return;
      }
      const digits = decimalsFor(slot.quote);
      const suffix = slot.unit === '%' ? '%' : '';
      pieces.push(`${slot.label} ${formatNumber(slot.quote.last, digits)}${suffix}`);
    });
    return pieces.join(' · ');
  }

  const HV_PERIOD = 20;
  const HV_ANNUALIZATION = 252;
  const VOLA_BASELINE = 5;
  const VOLA_JUMP_RATIO = 0.30;

  // IV symbols were checked against @mathieuc/tradingview 3.5.2 without a session.
  // TVC:VIX quotes and charts. TVC:GVZ is invalid; CBOE:GVZ quotes and charts.
  // VOLMEX:BVIV quotes and charts. TVC:EVZ and CBOE:EVZ are not listed.
  // VIX is not attached to ES. MOVE is not attached to €STR, SOFR, or SARON.
  const VOLATILITY_FEEDS = [
    {
      symbol: 'OANDA:XAUUSD',
      label: 'Gold',
      ivSymbol: 'CBOE:GVZ',
      ivName: 'GVZ',
      ivNote: 'CBOE Gold Volatility Index. TVC:GVZ ist kein gültiges Symbol.',
    },
    {
      symbol: 'BITSTAMP:BTCUSD',
      label: 'Bitcoin',
      ivSymbol: 'VOLMEX:BVIV',
      ivName: 'BVIV',
      ivNote: 'Volmex Bitcoin Implied Volatility, 30 Tage.',
    },
    {
      symbol: 'SP:SPX',
      label: 'S&P 500',
      ivSymbol: 'TVC:VIX',
      ivName: 'VIX',
      ivNote: 'CBOE Volatility Index über TVC:VIX.',
    },
    {
      symbol: 'CME_MINI:ES1!',
      label: 'E-mini',
      ivSymbol: null,
      ivName: null,
      ivReason: 'Kein ES-IV-Index. VIX ist der S&P-500-Index, nicht die Implizite des E-mini.',
    },
    {
      symbol: 'FX:EURUSD',
      label: 'Euro',
      ivSymbol: null,
      ivName: null,
      ivReason: 'Kein Euro-IV-Index. TVC:EVZ und CBOE:EVZ sind nicht gelistet.',
    },
  ];

  function sampleStdev(values) {
    const n = values.length;
    if (n < 2) return null;
    let mean = 0;
    for (let i = 0; i < n; i += 1) mean += values[i];
    mean /= n;
    let sum = 0;
    for (let i = 0; i < n; i += 1) {
      const delta = values[i] - mean;
      sum += delta * delta;
    }
    return Math.sqrt(sum / (n - 1));
  }

  /**
   * Close-to-close HV, annualized in percent.
   * Log returns over `period` daily closes, sample stdev (n−1), times sqrt(annualization).
   * Index i is null until `period` returns exist. Aligned to the close series.
   */
  function historicalVolatility(closes, period = HV_PERIOD, annualization = HV_ANNUALIZATION) {
    const series = Array.isArray(closes) ? closes : [];
    const out = new Array(series.length).fill(null);
    for (let i = period; i < series.length; i += 1) {
      const window = [];
      let ok = true;
      for (let j = i - period + 1; j <= i; j += 1) {
        const prev = series[j - 1];
        const cur = series[j];
        if (!(prev > 0) || !(cur > 0)) {
          ok = false;
          break;
        }
        window.push(Math.log(cur / prev));
      }
      if (!ok || window.length < period) continue;
      const sd = sampleStdev(window);
      if (sd == null) continue;
      out[i] = sd * Math.sqrt(annualization) * 100;
    }
    return out;
  }

  /**
   * Latest reading versus the mean of the previous `lookback` finite points.
   * Jumps only upward, at or above `threshold` (0.30 = +30%).
   */
  function volaJump(series, lookback = VOLA_BASELINE, threshold = VOLA_JUMP_RATIO) {
    const finite = (Array.isArray(series) ? series : []).filter((value) => Number.isFinite(value));
    const latest = finite.length ? finite[finite.length - 1] : null;
    if (finite.length < lookback + 1 || !Number.isFinite(latest)) {
      return {
        ready: false, latest, baseline: null, changeRatio: null, jumped: false,
      };
    }
    const window = finite.slice(finite.length - 1 - lookback, finite.length - 1);
    const baseline = window.reduce((sum, value) => sum + value, 0) / window.length;
    if (!(baseline > 0)) {
      return {
        ready: false, latest, baseline, changeRatio: null, jumped: false,
      };
    }
    const changeRatio = (latest - baseline) / baseline;
    return {
      ready: true,
      latest,
      baseline,
      changeRatio,
      jumped: changeRatio >= threshold,
    };
  }

  function formatVol(value) {
    if (!Number.isFinite(value)) return 'n/v';
    return `${value.toLocaleString('de-DE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}%`;
  }

  function buildVolatilityRow(feed, input = {}) {
    const closes = input.closes;
    const hvStats = volaJump(historicalVolatility(closes || []));
    const hvPending = closes == null;
    let iv = null;
    let ivStats = {
      ready: false, latest: null, baseline: null, changeRatio: null, jumped: false,
    };
    const ivLast = Number.isFinite(input.ivLast) ? input.ivLast : null;
    const ivCloses = Array.isArray(input.ivCloses)
      ? input.ivCloses.filter((value) => Number.isFinite(value))
      : null;

    if (feed.ivSymbol) {
      if (ivCloses && ivCloses.length && ivLast != null) {
        const withLive = ivCloses.slice();
        withLive[withLive.length - 1] = ivLast;
        ivStats = volaJump(withLive);
        iv = ivLast;
      } else if (ivLast != null) {
        iv = ivLast;
      } else if (ivCloses && ivCloses.length) {
        ivStats = volaJump(ivCloses);
        iv = ivStats.latest;
      }
    }

    const ivAvailable = Boolean(feed.ivSymbol) && Number.isFinite(iv);
    const ivPending = Boolean(feed.ivSymbol) && !ivAvailable && ivCloses == null && ivLast == null && !input.ivError;
    let ivReason = null;
    if (!ivAvailable && !ivPending) {
      const detail = feed.ivSymbol
        ? `${feed.ivSymbol} liefert keinen Last.`
        : (feed.ivReason || 'Kein IV-Index.');
      ivReason = `unavailable via TV API — ${detail}`;
    }

    return {
      symbol: feed.symbol,
      label: feed.label,
      ivSymbol: feed.ivSymbol || null,
      ivName: feed.ivName || null,
      ivNote: feed.ivNote || null,
      hv20: hvPending ? null : hvStats.latest,
      hvBaseline: hvPending ? null : hvStats.baseline,
      hvChangeRatio: hvPending ? null : hvStats.changeRatio,
      hvJump: hvPending ? false : Boolean(hvStats.jumped),
      hvPending,
      iv: ivAvailable ? iv : null,
      ivBaseline: ivAvailable ? ivStats.baseline : null,
      ivChangeRatio: ivAvailable ? ivStats.changeRatio : null,
      ivJump: ivAvailable ? Boolean(ivStats.jumped) : false,
      ivPending,
      ivAvailable,
      ivReason,
      dailyError: input.dailyError || null,
    };
  }

  function volatilitySummary(rows) {
    if (!rows || !rows.length) return '';
    return rows.map((row) => {
      let hv = 'HV20 ';
      if (row.hvPending) hv += '…';
      else hv += formatVol(row.hv20);
      if (row.hvJump) hv += ' ↑';
      let iv = 'IV ';
      if (row.ivPending) iv += '…';
      else if (row.ivAvailable) {
        iv += formatVol(row.iv);
        if (row.ivName) iv += ` ${row.ivName}`;
        if (row.ivJump) iv += ' ↑';
      } else iv += 'unavailable via TV API';
      return `${row.label} ${hv} ${iv}`;
    }).join(' · ');
  }

  function buildSnapshot({ watchlist, quotes, volatility, now = new Date() }) {
    const mode = sessionMode(now);
    const parts = (watchlist || []).map((symbol) => (
      quoteChunk(symbol, quotes[symbol], futuresFor(symbol, now))
    ));
    const volText = volatilitySummary(volatility);
    const lines = [`${mode} · ${clockLabel(now)}`];
    if (volText) lines.push(`Vola ${volText}`);
    lines.push(...packLines(parts, volText ? 2 : 3));
    lines.push(fundingSummary(buildFunding(quotes)));
    return { mode, lines: lines.slice(0, volText ? 6 : 5) };
  }

  function adviceLabel(value) {
    if (!Number.isFinite(value)) return '—';
    if (value >= 1) return 'Starker Kauf';
    if (value >= 0.2) return 'Kauf';
    if (value <= -1) return 'Starker Verkauf';
    if (value <= -0.2) return 'Verkauf';
    return 'Neutral';
  }

  return {
    ES_SYMBOL,
    esFrontMonth,
    futuresFor,
    sessionDate,
    sessionMode,
    clockLabel,
    decimalsFor,
    formatNumber,
    formatPct,
    formatIsoDate,
    formatClock,
    HV_PERIOD,
    HV_ANNUALIZATION,
    VOLA_BASELINE,
    VOLA_JUMP_RATIO,
    VOLATILITY_FEEDS,
    historicalVolatility,
    volaJump,
    formatVol,
    buildVolatilityRow,
    volatilitySummary,
    buildFunding,
    buildSnapshot,
    adviceLabel,
    packLines,
  };
}));
