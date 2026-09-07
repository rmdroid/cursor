# Lektorat Kap. 8–10 (Teil III) — Skills, die Geld verdienen

**Für:** Lara · **Von:** Lektorat (Gegenlesen nach Hans-Go) · **Stand:** 2026-09-07 (Europe/Berlin)  
**Kapitel:** `08-skills-bauen.md` · `09-betrieb-qualitaet.md` · `10-messen-steuern.md`  
**Checkliste:** `briefings/lektor-checkliste.md` · Stilreferenz: `briefings/lektorat-kap07.md`

---

## Gesamteinschätzung

**Mit Auflagen.** Teil III ist inhaltlich tragfähig: Anforderungsbrief vor Code, Qualitätskriterien, drei Muster-Skills, Betrieb nach Bewährung, Messung ohne Fantasie-ROI, GF-/IT-/Solo-Abschlüsse, Titel und Umlaute korrekt. Das „KI-Report-Gefühl“ saß in Semikolon-Ketten (Rollenblöcke, Atemzug-Listen, Messdefinitionen) und in holprigen Kontrasten nach Em-Dash-Entfernung („Platzhalter nicht zu…“, „Maßstab nicht…“). Kap. 8 hatte URL-/SKILL.md-Inflation (10 Voll-URLs); Kap. 9/10 Grafik-Platzhalter ohne PNG. Lektorat hat Atem, Komma-Reste, Kurzlinks und Frontmatter umgesetzt. Freigabe nach Lara-Gegenlesen der Schärfungen und Klärung der Flags unten.

---

## Blocker

### B1 — Abbildung Kap. 9 / 10 · Grafik fehlt *(flag Klaus, Platzhalter belassen)*
- **Problem:** Kap. 9 und 10 haben `*(Grafik folgt)*`. Im Repo liegen nur Grafiken bis `08-skill-steckbrief-template.png` (Kap. 8 bereits eingebunden). Anders als Kap. 7: hier keine Datei zum Nachziehen.
- **Fix:** Klaus liefert Qualitätsloop (Kap. 9) und Steuerungs-Cockpit-Felder ohne Demo-Ziffern (Kap. 10); Text hängt nicht an der Grafik (Feldliste/Beschreibung bleibt).
- **Umsetzung Lektorat:** Platzhalter geschärft (`Grafik folgt: Klaus`); keine Fantasie-Einbindung.

### B2 — Keine Zahlenblocker an Vera
- **Befund:** Keine erfundenen ROI-/Fehlerquoten als Buch-Wahrheit. Kap. 10 nennt „30 Prozent schneller“ ausdrücklich als Anti-Beispiel. Messgrößen sind Definitionen, Muster-Skills als Buch-Muster. **Kein Blocker an Vera.**

---

## Schärfung

### S1 — Holprige Komma-/Satzreste nach Em-Dash-Entfernung *(umgesetzt)*
- **Problem:** Kontraste ohne Trennung: „Platzhalter nicht zu…“, „Viererpack nicht als…“, „spezifiziert nicht aus…“, „werden nicht über…“, „Intervention nicht der…“, „zurückschreibt nicht in…“, „Maßstab nicht…“, „vorkommen nicht nur…“, „stoppen dürfen nicht beeindrucken“; plus Satzbrüche „Kostenarten. Tool…“, „Artefakt. Kalenderzeit…“.
- **Fix:** Komma vor Kontrast-„nicht“; Klammern/Doppelpunkt statt Bruch.
- **Umsetzung Lektorat:** flächig in Kap. 8–10.

### S2 — Semikolon-Ketten / Report-Ton *(umgesetzt)*
- **Problem:** GF-/IT-Abschlüsse, Bau-Sünden „in einem Atemzug“, Messdefinitionen und Rollen-Sätze als Semikolon-Report (wie Kap. 1/3/7).
- **Fix:** Kurze Sätze; Bau-Sünden als Bullet-Liste; Rollenblöcke atmen lassen.
- **Umsetzung Lektorat:** kritische Stellen entschärft; Tabellen-Semikolons und bewusste Aufzählungen belassen.

### S3 — Skill-URL / SKILL.md-Dump *(umgesetzt)*
- **Problem:** Kap. 8: 10× Voll-URL inkl. `…/SKILL.md` in Walkthrough und Solo; Kap. 9: Vollpfade in Liste und Solo. Kein `rmdroid/skills` (gut), aber Dump-Gefühl.
- **Fix:** Kap.7-Muster: Basis-URL sparsam + Kurzlinks `angebot-aus-kickoff` / `protokoll-entscheidungen` / `status-mandat-kurz`. IT ohne erneute Voll-URL.
- **Umsetzung Lektorat:** Kap. 8 → 2× Basis; Kap. 9 → 2× Basis; Kap. 10 → 1× Basis. `SKILL.md` nur noch als Dateikonzept (Übersetzung/Sync), keine Rohpfade.

### S4 — „Baustein“-Häufung *(umgesetzt)*
- **Problem:** Kap. 8 stark (8×), Kap. 9/10 nachgezogen; Lehrbuch-Sterilität wie Kap. 7.
- **Fix:** Variieren zu Skill / er / Bibliothekseintrag.
- **Umsetzung Lektorat:** Kap. 8 auf 1 gezieltes Vorkommen; Kap. 9/10 auf 0.

### S5 — Typo / Grammatik *(umgesetzt)*
- **Kap. 10:** „Zähnen und Schwere“ → „Zählen und Schwere“.
- **Kap. 8:** „Rohbau, der Owner füllt“ → „Rohbau, bei dem der Owner den Kommerz … füllt“.
- **Kap. 8:** „Bis dahin die Feldliste“ trotz eingebundener Grafik → „Die Feldliste im Text“.
- **Kap. 9:** „Portfolio-Review aus Kapitel 5. Outcomes…“ → Klammer statt Punktbruch.

### S6 — Frontmatter-Status *(umgesetzt)*
- **Fix:** `status: lektorat-auflagen` in Kap. 8, 9, 10.

### S7 — Grafik Kap. 8 Steckbrief *(OK)*
- **Befund:** `assets/grafiken/08-skill-steckbrief-template.png` eingebunden + Caption. OK.

---

## Stil

### St1 — Deutsch / Umlaute
- **Befund:** Echte Umlaute durchgängig. Kein `—` im Fließtext (YAML `---` / Tabellen ok; En-Dash in „31–60“ als Spanne belassen). OK.

### St2 — Titel
- **Befund:** Frontmatter `book: Skills, die Geld verdienen` — exakt. OK.

### St3 — Hype / Consultant-Deutsch
- **Befund:** Kein „disruptiv / game-changing / KI-Revolution“. Ton fair-scharf. OK.

### St4 — Drei-Rollen-Pfade
- **Befund:** GF / IT / Solo in allen drei Kapiteln vorhanden und rollenspezifisch; nach Schärfung lesbarer. OK.

### St5 — Musterkennzeichnung / Claims
- **Befund:** Drei Skills als Buch-Muster; Messung Methode statt Behauptung; Anhang-C-Verweis. Keine Fantasie-ROI. OK.

### St6 — Übergänge Teil III
- **Befund:** 7→8→9→10 Naht klar (Pipeline → Brief → Betrieb → Steuergrößen). Lesepfade light OK. OK.

---

## Flags an Vera / Klaus / Mara / Alfred

| An | Thema | Priorität |
|----|--------|-----------|
| **Klaus** | Grafiken Kap. 9 (Qualitätsloop + Eskalation/Pause) und Kap. 10 (Cockpit-Felder, **keine Demo-Zahlen**) liefern und einbinden | Blocker-Grafik |
| **Klaus** | Skill-Basis-URL: Kap. 8 (2×), Kap. 9 (2×), Kap. 10 (1×); bei Companion-Umzug Sync mit Kap. 1/3/7 | Monitor |
| **Vera** | Keine Zahlenblocker in Kap. 8–10; „30 %“ nur Anti-Beispiel belassen; echte Kennzahlen nur über Anhang C | OK |
| **Mara** | Optional Rest-Semikolons in Walkthrough-Wie/Wo (Kap. 8) und Betriebszeichen-Liste (Kap. 9) weiter atmen lassen, falls Lara noch Report-Ton spürt | Stil |
| **Alfred** | Scope: Kap. 9/10 Text ohne Bildabhängigkeit OK; Grafik nachziehen ohne Inhalt zu ändern | Hinweis |

---

## Checkliste (Kurz)

| Bereich | Kap. 8 | Kap. 9 | Kap. 10 |
|---------|--------|--------|---------|
| Klarheit / Nutzen im Einstieg | OK | OK | OK |
| GF · IT · Solo-Abschluss | OK (geschärft) | OK (geschärft) | OK (geschärft) |
| Skills ohne Code-Dump / Kurzlinks | OK | OK | OK |
| Muster / keine Fantasie-ROI | OK | OK | OK |
| Em-Dash Fließtext | keins | keins | keins |
| Holprige Komma-Reste | entschärft | entschärft | entschärft |
| Grafik | eingebunden | Platzhalter | Platzhalter + Tabelle |
| Umlaute / Titel | OK | OK | OK |
| Semikolon / Report-Ton | entschärft | entschärft | entschärft |

---

## Geschriebene / geänderte Dateien

| Pfad | Aktion |
|------|--------|
| `briefings/lektorat-kap08-10.md` | neu (diese Liste) |
| `kapitel/08-skills-bauen.md` | lektoriert (Komma-Reste, Atem, Kurzlinks, Baustein-Sparsamkeit, Feldliste/Grafik-Naht, GF/IT/Solo, `status: lektorat-auflagen`) |
| `kapitel/09-betrieb-qualitaet.md` | lektoriert (Komma-Reste, Atem, Kurzlinks, Baustein→Skill, Abbildung-Platzhalter Klaus, GF/IT/Solo, `status: lektorat-auflagen`) |
| `kapitel/10-messen-steuern.md` | lektoriert (Komma-Reste, Atem, Zählen-Typo, Baustein→Skill, Abbildung-Platzhalter Klaus, GF/IT/Solo, `status: lektorat-auflagen`) |

**Urteil kurz:** nicht zurück an Mara als Ganzes — **mit Auflagen freigabefähig**, sobald Lara die Schärfungen gegenliest und Klaus die Grafiken 9/10 nachzieht.
