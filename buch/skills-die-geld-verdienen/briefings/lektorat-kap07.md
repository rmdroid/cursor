# Lektorat Kap. 7 — Skills, die Geld verdienen

**Für:** Lara · **Von:** Lektorat (Gegenlesen nach Hans-Go) · **Stand:** 2026-09-07 (Europe/Berlin)  
**Kapitel:** `07-methode-prozess-agent.md`  
**Checkliste:** `briefings/lektor-checkliste.md` · Stilreferenz: `briefings/lektorat-kap01-03.md`

---

## Gesamteinschätzung

**Mit Auflagen.** Kapitel 7 ist handwerklich stark: klare Pipeline, Pflichtreihenfolge vor dem Agenten, Pilot mit Stop-Kriterium, zwei Fallskizzen ausdrücklich als **Muster**, keine erfundenen ROI-/Durchlaufquoten, GF-/IT-/Solo-Abschluss vorhanden, Titel und Umlaute korrekt. Das „KI-Zusammenfassungs-Gefühl“ saß vor allem in Semikolon-Ketten (Stop-Kriterien, Fehlgriffe, Skill-Trio, Rollenblöcke) und in vierfacher GitHub-URL plus Disclaimer-Echo. Grafik-Datei lag bereits vor, Text hatte noch Platzhalter. Lektorat hat Atem, Grafikeinbindung und Link-Sparsamkeit umgesetzt — Freigabe nach Lara-Gegenlesen der Schärfungen und Klärung der Flags unten.

---

## Blocker

### B1 — Abbildung · Platzhalter trotz vorhandener Datei *(umgesetzt)*
- **Problem:** Abschnitt „Abbildung“ mit „*(Grafik folgt: Pipeline End-to-End — Vera/Klaus)*“, obwohl `assets/grafiken/07-pipeline-end-to-end.png` existiert und README sie listet. Andere Kapitel (1–6) binden bereits ein.
- **Fix:** Markdown-Einbindung analog Kap. 1–6 + Bildunterschrift Abbildung 7; Verweis im Pipeline-Abschnitt von „später als Grafik“ auf Kapitelende.
- **Umsetzung Lektorat:** erledigt.

### B2 — Keine echten Zahlenblocker
- **Befund:** Keine erfundenen Durchlauf-/Fehlerquoten/ROI. Pilot nennt Messgrößen nur als Kap.-10-Vorschau (Zeit, Fehlerquote, Durchlauf …) ohne Quoten. Muster mit Anhang-C-Verweis und „X Prozent“ als Anti-Claim. **Kein Blocker an Vera.**

---

## Schärfung

### S1 — Semikolon-Ketten / Baustein-Report-Ton *(teilweise umgesetzt)*
- **Problem:** Stop-Kriterien, „Häufige Fehlgriffe in einem Atemzug“, Skill-Trio in einem Satz, Lesepfad und IT-Abschluss als Semikolon-Report — dasselbe Hans-Prioritätsproblem wie Kap. 1/3.
- **Fix:** In kurze Sätze bzw. knappe Bullet-Liste (Skill-Trio) zerlegen; Rollenblöcke atmen lassen.
- **Umsetzung Lektorat:** kritische Stellen entschärft; Pilot-Fragen-Absatz bewusst als Fragen belassen (Scanbarkeit).

### S2 — Skill-URL / Disclaimer-Inflation *(umgesetzt)*
- **Problem:** Voll-URL `…/buch/skills-die-geld-verdienen/skills` viermal; „kein SKILL.md-Dump / Wie-Warum-Wo“ doppelt. Kein `rmdroid/skills` (gut), aber Dump-Gefühl durch Wiederholung.
- **Fix:** Basis einmal im Skillen-Abschnitt + Kurzverweis Solo-Abschluss; IT ohne erneute URL („Bibliothek aus dem Buch-Repo“); zweites Disclaimer-Echo streichen.
- **Umsetzung Lektorat:** erledigt (2× Basis-URL). Keine SKILL.md-Rohpfade im Fließtext (Kurzlinks = Ordnerbasis + Skill-Namen).

### S3 — „Baustein“-Häufung *(umgesetzt)*
- **Problem:** Sechs Vorkommen inkl. Einstieg und Schema — Lehrbuch-Sterilität (vgl. Kap. 1–3 St1).
- **Fix:** Variieren: Fähigkeiten, Bibliothekseintrag, Skills; Schema-Label „Skills“.
- **Umsetzung Lektorat:** flächig auf null „Baustein“ reduziert — bei Bedarf ein gezieltes Vorkommen wieder erlauben (Lara).

### S4 — „Auftragstype“ *(umgesetzt)*
- **Problem:** Tippfehler / Hybridform.
- **Fix:** „ein Auftragstyp“.
- **Umsetzung Lektorat:** erledigt.

### S5 — Frontmatter-Status *(umgesetzt)*
- **Problem:** `status: entwurf` nach Lektorat irreführend.
- **Fix:** `status: lektorat-auflagen`.
- **Umsetzung Lektorat:** gesetzt.

### S6 — Fallskizze Mittelstand · Disclaimer-Länge *(Hinweis)*
- **Problem:** Erste Muster-Klammer ist korrekt, aber lang (Zahlenverbot + Anhang C + Fallstudie). Freelancer nur „*(Muster.)*“ — asymmetisch.
- **Empfehlung Mara/Lara:** Mittelstand-Klammer kürzen auf „*(Muster, keine Fallstudie — Kennzahlen nur über Anhang C.)*“; Freelancer optional um denselben Halbsatz ergänzen. **Kein Blocker.**

---

## Stil

### St1 — Deutsch / Umlaute
- **Befund:** Echte Umlaute durchgängig. OK.

### St2 — Titel
- **Befund:** Frontmatter `book: Skills, die Geld verdienen` — exakt. OK.

### St3 — Hype / Consultant-Deutsch
- **Befund:** Kein „disruptiv / game-changing / KI-Revolution“. Ton fair-scharf, Methode vor Modell. OK.

### St4 — Drei-Rollen-Pfade
- **Befund:** Abschlussblöcke GF / IT / Solo vorhanden und rollenspezifisch. Nach Schärfung lesbarer. OK.

### St5 — Logische Übergänge
- **Befund:** Einstieg Teil-II→III klar; Pipeline → Intervention → Pilot → Fallskizzen → Abgrenzung → Abbildung → Rollen. Keine Brüche. Leichte Doppelung Kurzschema (textlich) + Abbildung: bewusst behalten (Text hängt nicht an Grafik). OK.

### St6 — Claims / Vera
- **Befund:** Keine belastbaren Einzelfälle als Fakten verkauft; „zweithäufigster Fehler“ ist rhetorisch, nicht quotiert — akzeptabel ohne LEKTOR-Flag. Messungskapitel nur benannt. OK.

### St7 — Skill-Repo-Pfad
- **Befund:** Kanonisch unter `rmdroid/cursor/.../skills` — nicht Privat-Repo. OK. Klaus: Companion-Freigabe/Live-Pfad weiter monitoren.

---

## Flags an Vera / Klaus / Mara / Alfred

| An | Thema | Priorität |
|----|--------|-----------|
| **Klaus** | Grafik `07-pipeline-end-to-end.png` ist eingebunden — Caption/Export-Pipeline ggf. einmal gegen PNG prüfen (Verantwortungsgrenze Kap. 2/5/6 im Bild) | Info |
| **Klaus** | Skill-Basis-URL 2× im Kapitel; wenn Companion umzieht, beide Stellen + Kap. 1/3 Sync | Monitor |
| **Mara** | Optional: Muster-Klammern Mittelstand/Freelancer angleichen (S6); ggf. ein „Baustein“ gezielt zurück, falls Lara Varianz will | Stil |
| **Vera** | Keine Zahlenblocker in Kap. 7; Anhang-C-Verweis ohne Pseudo-Quote belassen | OK |
| **Alfred** | Scope: Kurzschema ASCII + Abbildung 7 — Doppelung gewollt für EPUB ohne Bildabhängigkeit? | Hinweis |

---

## Checkliste (Kurz)

| Bereich | Urteil |
|---------|--------|
| Klarheit / Nutzen im Einstieg | OK |
| GF · IT · Solo-Abschluss | OK (geschärft) |
| Skills ohne Code-Dump | OK |
| Muster statt erfundenem Fall | OK |
| Keine ROI-Quoten ohne Anhang C | OK |
| Grafik | eingebunden |
| Umlaute / Titel | OK |
| Semikolon / Report-Ton | entschärft; Rest Monitor |

---

## Geschriebene / geänderte Dateien

| Pfad | Aktion |
|------|--------|
| `briefings/lektorat-kap07.md` | neu (diese Liste) |
| `kapitel/07-methode-prozess-agent.md` | lektoriert (Atem, URL/Disclaimer, Baustein-Sparsamkeit, Grafik, Auftragstyp, GF/IT/Solo, `status: lektorat-auflagen`) |

**Urteil kurz:** nicht zurück an Mara als Ganzes — **mit Auflagen freigabefähig**, sobald Lara die umgesetzten Schärfungen gegenliest und ggf. S6 (Muster-Klammern) entscheidet.
