# Lektorat Kap. 14–15 (Teil V Fahrplan & Fehler) — Skills, die Geld verdienen

**Für:** Lara · **Von:** Lektorat (Gegenlesen nach Hans-Go) · **Stand:** 2026-09-08 (Europe/Berlin)  
**Kapitel:** `14-90-tage-fahrplan.md` · `15-fehler-gegenmittel.md`  
**Checkliste:** `briefings/lektor-checkliste.md` · Stilreferenz: `briefings/lektorat-kap12-13.md`, `briefings/lektorat-kap11.md`

---

## Gesamteinschätzung

**Mit Auflagen.** Kapitel 14 und 15 sind inhaltlich tragfähig: 90-Tage-Rahmen mit Stop-Gates, Solo- vs. 50–250-Anpassung, Timeline-Grafik eingebunden; Fehlerkatalog als Korrekturkarte (nicht Vernichten-Ton) mit Symptom / Warum teuer / Gegenmittel / Zurück; GF-/IT-/Solo-Abschlüsse rollenspezifisch; Verweise statt Neuaufguss; drei Muster-Skills mit Kurzlinks; kein Fantasie-ROI; Titel und Umlaute korrekt; kein `—` im Fließtext. Vor Lektorat saß Report-Ton vor allem in Kap. 14 (Semikolon-Ketten in Realitätscheck, Bedingungen, Solo-/Betrieb-Absätzen, Rollenlisten) plus 1× „Bausteine“ und Komma-Reste („nur wenn“). Kap. 15 war schon klarer; wenige Fließtext-Semikolons und Frontmatter fehlten. Lektorat hat Atem, Baustein→Elemente, Kommas, Disclaimer-Lage belassen und Frontmatter gesetzt. Freigabe nach Lara-Gegenlesen der Schärfungen und Klärung der Flags unten.

---

## Blocker

### B1 — Keine Zahlenblocker an Vera
- **Befund:** Keine erfundenen ROI-/Produktivitätsquoten. Kap. 14: Anti-ROI, leere Felder ehrlicher als erfundene Prozentwerte, Anhang-C-Hinweis. Kap. 15: „Keine Fantasie-Prozentwerte“, ROI nur als Anti-Muster (Mess-Theater). Fehlerquote nur als Messgröße (Checklisten-Fails), nicht als Quote-Claim. Caption und Grafik: explizit keine Demo-Zahlen / kein ROI. **Kein Blocker an Vera.**

### B2 — Em-Dash / Komma-Reste
- **Befund:** Kein `—` im Fließtext (YAML `---` ok). Holprige Reste Kap. 14: H2 und Fließtext „Routine nur wenn…“, Solo-Morgen „nur wenn der Loop trägt“.
- **Umsetzung Lektorat:** Kommas gesetzt (`nur, wenn`). OK.
- **Hinweis Grafik:** In `assets/grafiken/14-90-tage-timeline.png` stehen Phasenüberschriften mit Em-Dash („Tage 1–30 — Orientierung…“). Markdown-Caption ist dash-frei. Flag an Alfred/Grafik, falls Buchregel auch Asset-Text gilt.

---

## Schärfung

### S1 — Semikolon-Ketten / Report-Ton *(umgesetzt)*
- **Problem:** Kap. 14: Realitätscheck, Vier-Bedingungen, Solo-/Betrieb-Phasen, Messung, IT-/Solo-Abschluss als Semikolon-Report. Kap. 15: einzelne Fließtext-Semikolons (Budget/Architektur, IT/Fachseite, Solo-Liste); „Zurück:“-Zeilen als kompakte Feldlisten.
- **Fix:** Fließtext-Semikolons → kurze Sätze; „Zurück:“ bewusst belassen (Kap.-12/13-Muster für Querverweis-Klammerlisten).
- **Umsetzung Lektorat:** Kap. 14 auf 0 Semikolons; Kap. 15 nur noch in **Zurück:**-Zeilen.

### S2 — „Baustein“-Häufung *(umgesetzt)*
- **Problem:** 1× Kap. 14 Einstieg („dieselben Bausteine“).
- **Fix:** → „dieselben Elemente“.
- **Umsetzung Lektorat:** auf 0 reduziert. Kap. 15: 0.

### S3 — Timeline-Grafik & Caption *(OK)*
- **Befund:** `![…](../assets/grafiken/14-90-tage-timeline.png)` eingebunden. Caption: Phasen, Stop-Gates, Solo vs. 50–250 nur als Label; „Keine Demo-Zahlen, kein Fantasie-ROI.“ Asset-Untertitel deckungsgleich (kein ROI). Text hängt nicht von fehlender Grafik ab. OK.

### S4 — Skill-URL / Kurzlinks *(OK, Monitor)*
- **Befund:** Kanonische Basis-URL `rmdroid/cursor/.../buch/skills-die-geld-verdienen/skills` (Kap. 14: 3×; Kap. 15: 3×). Kurzlinks **status-mandat-kurz** / **angebot-aus-kickoff** / **protokoll-entscheidungen**. Kein `rmdroid/skills`, kein SKILL.md-Rohpfad, kein Dump. Muster Kap. 7/10–13. OK.
- **Klaus:** bei Companion-Umzug Sync mit Kap. 7–13.

### S5 — Frontmatter-Status *(umgesetzt)*
- **Fix:** `status: lektorat-auflagen` in Kap. 14 und 15.

### S6 — Kap. 15 Ton / Katalogklarheit *(OK)*
- **Befund:** Einstieg „Korrekturkarte“, nicht Horror/Schuld. Neun Fehler mit gleichem Raster; Diagnose vor dem nächsten Outcome; „Was gilt gemeinsam“ ordnet Auswahl-/Bau-/Steuerungsfehler. Vernichten-Ton vermieden, fair-scharf. Disclaimer Kap. 6 sparsam (1× Rechtsrat Kap. 14 Solo; Kap. 15 „ohne Rechtsersatz“ / „kein Rat“). OK.

### S7 — Länge *(OK, Monitor Alfred)*
- **Befund:** Checkliste nennt Kap. 15 als Straf-Hebel. Ist ~1440 Wörter; Kap. 14 ~1890. Katalog ist scannbar, kein Kahlschlag nötig. Optional später verdichten, falls Teil V gesamt zu dick wird.

---

## Stil

### St1 — Deutsch / Umlaute
- **Befund:** Echte Umlaute durchgängig (Führung, Freiberufler, Größe, …). OK.

### St2 — Titel / H1
- **Befund:** Frontmatter `book: Skills, die Geld verdienen` exakt. H1 „90-Tage-Fahrplan“ / „Typische Fehler und Gegenmittel“ — kein `—`. OK.

### St3 — Hype / Consultant-Deutsch
- **Befund:** „KI-Transformation in Quartalen“ nur als Anti-Zitat. Kein disruptiv / game-changing / KI-Revolution. OK.

### St4 — Rollenfokus / GF · IT · Solo
- **Befund:** Beide Kapitel mit Abschlussblöcken. Kap. 14 zusätzlich Solo- und 50–250-Anpassung im Fließtext. Kap. 15 rollenspezifisch ohne „gilt für alle gleich“. OK (nach Atem lesbarer).

### St5 — Redundanz / Neuaufguss
- **Befund:** Verweise auf Kap. 3–13 statt Copy; Kap. 14 kalendert, Kap. 15 verdichtet. Naht 13→14→15 und Lesepfad light klar. OK.

### St6 — Musterkennzeichnung / Claims
- **Befund:** Skills als Buch-Muster; Anti-ROI; Fehlerquote nur als Mess-Idee. Kein LEKTOR-Flag an Vera. OK.

### St7 — Übergänge Teil V
- **Befund:** 13→14 (Rollen→Kalender), 14→15 (Fahrplan→Korrekturkarte), Ausblick und gemeinsame Schlusssätze OK. OK.

---

## Flags an Vera / Klaus / Mara / Alfred

| An | Thema | Priorität |
|----|--------|-----------|
| **Vera** | Keine Zahlenblocker in Kap. 14–15; Anti-ROI, Caption und Grafik ohne Demo-Zahlen belassen | OK |
| **Klaus** | Skill-Basis-URL Kap. 14 (3×) und Kap. 15 (3×); bei Companion-Umzug Sync mit Kap. 7–13 | Monitor |
| **Mara** | Optional: „Zurück:“-Semikolon-Listen Kap. 15 in Bullets, falls Lara Rest-Report spürt; Fehlerquote weiter nur als Mess-Idee (Kap. 10), nicht als Claim | Stil |
| **Alfred** | Scope: Kap. 15 Länge OK/knapp; Straf-Hebel erst bei Teil-V-Übergewicht. Grafik-Asset: Em-Dash in Phasenüberschriften ggf. durch Doppelpunkt/Gedankenstrich-Alternative ersetzen, falls Dash-Regel auch für Grafiktext gilt | Hinweis |

---

## Checkliste (Kurz)

| Bereich | Kap. 14 | Kap. 15 |
|---------|---------|---------|
| Klarheit / Nutzen im Einstieg | OK | OK |
| GF · IT · Solo-Abschluss | OK (geschärft) | OK |
| Skills ohne Code-Dump / Kurzlinks | OK (3× Basis) | OK (3× Basis) |
| Muster / keine Fantasie-ROI | OK | OK |
| Timeline-Grafik + Caption ohne Demo-ROI | OK | n/a |
| Em-Dash Fließtext | keins | keins |
| Holprige Komma-Reste | entschärft | n/a |
| Verweise statt Neuaufguss | OK | OK |
| Umlaute / Titel | OK | OK |
| Semikolon / Report-Ton | 0 Semikolons | nur Zurück:-Listen |
| Baustein-Häufung | 0 | 0 |
| Fehlerkatalog klar / kein Vernichten | n/a | OK |
| Disclaimer-Sparsamkeit | OK (1× Rechtsrat Solo) | OK (Kap.-6-Naht) |

---

## Geschriebene / geänderte Dateien

| Pfad | Aktion |
|------|--------|
| `briefings/lektorat-kap14-15.md` | neu (diese Liste) |
| `kapitel/14-90-tage-fahrplan.md` | lektoriert (Semikolon→Atem, Baustein→Elemente, Komma „nur, wenn“, `status: lektorat-auflagen`) |
| `kapitel/15-fehler-gegenmittel.md` | lektoriert (Fließtext-Semikolons→Atem, `status: lektorat-auflagen`) |

**Urteil kurz:** nicht zurück an Mara als Ganzes — **mit Auflagen freigabefähig**, sobald Lara die umgesetzten Schärfungen gegenliest.
