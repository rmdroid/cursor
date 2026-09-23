# Market Intelligence Cockpit

Lokales Fenster für Hans und Nadine (Finance): Kurse lesen, Marken setzen, eine kurze Sitzungsnotiz mitnehmen. Keine Orders, kein Portfolio, kein offizielles TradingView.

## Start

```bash
cd market-cockpit
npm install
npm start
```

Dann im Browser [http://127.0.0.1:4173](http://127.0.0.1:4173) öffnen. Port und Bind-Adresse: `PORT` und `HOST` (Standard `4173` und `127.0.0.1`).

Tests ohne Netz: `npm test`.

## Quelle

Kurse, Kerzen und die technische Einschätzung kommen über das **inoffizielle** Paket [`@mathieuc/tradingview`](https://www.npmjs.com/package/@mathieuc/tradingview) von Mathieu Colmon: [Mathieu2301/TradingView-API](https://github.com/Mathieu2301/TradingView-API). Das Cockpit spricht die Bibliothek so an, wie die Beispiele im Upstream es tun (`Client`, `Session.Quote`, `Session.Chart`, `searchMarketV3`, `getTA`).

Das ist nicht TradingView, nicht mit TradingView verbunden, und kein Zugang zu einem Broker. v1 hat keine Anmeldung. Wer später eine Premium-Session braucht, kann die Cookies setzen, die die Bibliothek erwartet:

```bash
TRADINGVIEW_SESSION=... TRADINGVIEW_SIGNATURE=... npm start
```

`TRADINGVIEW_SESSION` ist das Cookie `sessionid`, `TRADINGVIEW_SIGNATURE` ist `sessionid_sign`.

Die Kerzen zeichnet [TradingView Lightweight Charts](https://github.com/tradingview/lightweight-charts) (Apache-2.0). Das ist nur die Zeichenfläche. Die Daten kommen nicht aus einem offiziellen TradingView-Produkt.

## Was live geht

Geprüft gegen die Bibliothek 3.5.2 ohne Login:

| Rolle | Symbol |
| --- | --- |
| Gold | `OANDA:XAUUSD` |
| Bitcoin | `BITSTAMP:BTCUSD` |
| S&P 500 Kasse | `SP:SPX` |
| E-mini Continuous | `CME_MINI:ES1!` |
| Euro | `FX:EURUSD` |
| Nestlé (optional) | `SIX:NESN` |
| Bund 2Y / 10Y | `TVC:DE02Y`, `TVC:DE10Y` |
| OAT 10Y | `TVC:FR10Y` |

Quote-Felder über `customFields`: Last (`lp`), Tagesspanne (`high_price` / `low_price`), Veränderung (`ch`, `chp`), 52 Wochen (`price_52_week_high` / `price_52_week_low`). Die 52-Wochen-Felder stehen nicht in der Typ-Liste der Bibliothek, `customFields` reicht sie aber durch, und der Socket liefert sie.

Kerzen: Chart-Session mit Timeframe `D` oder `W`, wie in `examples/SimpleChart.js`. SMA 20/50/200, RSI 14 und MACD 12/26/9 werden aus diesen OHLC-Werten gerechnet. `BuiltInIndicator` in dieser Version kennt nur Volumenprofile, keine SMA/RSI/MACD-Studien. Die Einschätzung „Kauf/Verkauf“ kommt separat von `getTA`.

OAT–Bund ist `TVC:FR10Y − TVC:DE10Y` in Basispunkten, keine eigene TV-Serie.

## Slots ohne Kurs

Diese Felder bleiben in der Oberfläche, damit später eine andere Quelle daneben passt. Der Text beginnt mit `unavailable via TV API`.

- **€STR:** Die Symbolsuche findet kein Tages-Fixing. `CME:ESR1!` ist der ESTR-Future (Notierung um 100 minus Satz), nicht der ECB-Satz. Er wird nicht als €STR angezeigt.
- **SARON:** Kein Overnight-Fixing. Gefunden werden nur SARON-Futures.
- **SOFR:** `FRED:SOFR` ist gelistet. Ohne Session kommt in der Quote kein Last, der Chart antwortet mit `permission denied`. Liegt eine Session und ein Last vor, füllt sich der Slot.

## Futures

Nur für `CME_MINI:ES1!`: Frontmonat (`ESU2026`, `ESZ2026`, …) und letzter Handelstag. Das ist ein Kalenderhinweis (3. Freitag, 09:30 New York), kein Verfallsfeld aus der Quote und kein Optionsboard.

Der Sitzungsüberblick (Pre-Market / Laufend / Close) richtet sich nach der Uhr in Zürich: vor 15:30 Pre-Market, ab 22:00 oder am Wochenende Close. Das ist keine Börsen-Kalenderlogik.

Marken (Support/Widerstand) und Strategie-Notizen liegen im `localStorage` des Browsers. Gold startet mit 4000 / 4150 / 4550. Ein Bruch löst einen Hinweis in der Oberfläche aus, keine Order.

JSON- und CSV-Kopien enthalten die aktuellen Kurse, Marken, Refinanzierungs-Slots und die fünf Zeilen des Überblicks.
