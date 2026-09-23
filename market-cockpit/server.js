const path = require('path');
const express = require('express');
const { TvBridge } = require('./src/tvBridge');

const PORT = Number(process.env.PORT) || 4173;
const HOST = process.env.HOST || '127.0.0.1';

function normalizeSymbol(input) {
  const symbol = String(input || '').trim().toUpperCase();
  if (!/^[A-Z0-9._-]{1,24}:[A-Z0-9._!-]{1,32}$/.test(symbol)) return null;
  return symbol;
}

function createApp(bridge) {
  const app = express();
  app.disable('x-powered-by');
  app.use(express.json({ limit: '32kb' }));
  app.use('/api', (req, res, next) => {
    res.set('Cache-Control', 'no-store');
    next();
  });

  app.get('/api/health', (req, res) => {
    const state = bridge.getState();
    res.json({
      ok: state.status === 'live',
      status: state.status,
      error: state.error,
      serverTime: state.serverTime,
    });
  });

  app.get('/api/state', (req, res) => {
    res.json(bridge.getState());
  });

  app.get('/api/events', (req, res) => {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    });
    const send = (state) => {
      res.write(`data: ${JSON.stringify(state)}\n\n`);
    };
    send(bridge.getState());
    const unsubscribe = bridge.onState(send);
    const ping = setInterval(() => res.write(': ping\n\n'), 20000);
    req.on('close', () => {
      clearInterval(ping);
      unsubscribe();
    });
  });

  app.post('/api/reconnect', (req, res) => {
    bridge.reconnect();
    res.json(bridge.getState());
  });

  app.post('/api/subscriptions', (req, res) => {
    const incoming = req.body && req.body.symbols;
    if (!Array.isArray(incoming) || incoming.length > 30) {
      res.status(400).json({ error: 'symbols must be an array of at most 30 ids' });
      return;
    }
    const accepted = [];
    const rejected = [];
    incoming.forEach((item) => {
      const symbol = normalizeSymbol(item);
      if (!symbol) rejected.push(String(item));
      else if (!accepted.includes(symbol)) accepted.push(symbol);
    });
    bridge.setWatchlist(accepted);
    res.json({ symbols: accepted, rejected });
  });

  app.get('/api/search', async (req, res) => {
    const q = String(req.query.q || '').trim();
    if (q.length < 2 || q.length > 40) {
      res.json([]);
      return;
    }
    try {
      res.json(await bridge.search(q));
    } catch (err) {
      res.status(502).json({ error: err.message || 'Suche fehlgeschlagen' });
    }
  });

  app.get('/api/chart', async (req, res) => {
    const symbol = normalizeSymbol(req.query.symbol);
    const timeframe = req.query.timeframe === 'W' || req.query.timeframe === 'D'
      ? req.query.timeframe
      : null;
    if (!symbol || !timeframe) {
      res.status(400).json({ error: 'Symbol und Timeframe D oder W werden gebraucht.' });
      return;
    }
    try {
      res.json(await bridge.getChart(symbol, timeframe));
    } catch (err) {
      res.status(502).json({ error: err.message || 'Chart fehlgeschlagen' });
    }
  });

  app.get('/api/ta', async (req, res) => {
    const symbol = normalizeSymbol(req.query.symbol);
    if (!symbol) {
      res.status(400).json({ error: 'symbol is required' });
      return;
    }
    try {
      const ta = await bridge.technicalAnalysis(symbol);
      res.json({ symbol, ta });
    } catch (err) {
      res.status(502).json({ error: err.message || 'TA fehlgeschlagen' });
    }
  });

  app.get('/lib/shared.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'shared.js'));
  });

  app.use(
    '/vendor/lightweight-charts',
    express.static(path.join(__dirname, 'node_modules', 'lightweight-charts', 'dist')),
  );
  app.use(express.static(path.join(__dirname, 'public')));

  return app;
}

if (require.main === module) {
  const bridge = new TvBridge();
  bridge.start();
  const app = createApp(bridge);
  app.listen(PORT, HOST, () => {
    console.log(`Market Intelligence Cockpit at http://${HOST}:${PORT}`);
  });
}

module.exports = { createApp, normalizeSymbol };
