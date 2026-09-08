# Outline (Arbeitsfassung)

**Buch:** Skills, die Geld verdienen 
**Untertitel:** Welche Workflows ein Skill verdienen. Bauen, testen, im Mandat einsetzen. 
**Label:** KI-Zentrum Mittelstand (Serie/Verlagskontext; Cover zeigt Autorlinie) 
**Autorlinie:** Robert Meyer 
**Umfangziel:** ca. 180–220 Seiten (DIN A5) 
**Zielgruppe:** Geschäftsführung, IT-Leitung, Freiberufler 
**Stand:** 2026-09-07 · Mara · Arbeitsfassung v1.1 (Titel an Cover) 
**Hinweis:** Keine erfundenen Zahlen/Quellen. Skill-Code nicht im Buch. Beispiel-Skills für Zielgruppen spezifizieren und unter `buch/skills-die-geld-verdienen/skills/` in `rmdroid/cursor` ablegen (Download/Copy-Paste). Im Buch: Wie/Warum/Wo + Repo-Verweis. **Kein** `rmdroid/skills`. Großes Impressum: Hans. Früherer Cover-Kandidat „KI-Agenten & KI-Skills für den Mittelstand“ war Verwechslung, nicht Buchtitel.

---

## Leselogik

Drei Leser, ein Buch: 
1. **Geschäftsführung** will Nutzen, Risiko, Ownership und Freigaben. 
2. **IT-Leitung** will Architektur, Integration, Betrieb und Grenzen. 
3. **Freiberufler** wollen schlanke Setups ohne Konzernapparat.

Jedes Praxiskapitel endet mit: *Was GF entscheidet / Was IT umsetzt / Was Solo morgen starten kann.*

---

## Frontmatter (ca. 8–10 S.)

| Block | Inhalt | ~S. |
|-------|--------|-----|
| Cover | Asset vorhanden |, |
| Kleines Impressum | Asset Seite 2 | 1 |
| Inhaltsverzeichnis | aus Outline generiert | 2–3 |
| Vorwort | Warum jetzt; für wen; was dieses Buch *nicht* ist | 3–4 |
| Lesehilfe | Symbole/Rollenpfade GF · IT · Solo | 1–2 |

---

## Teil I. Orientierung (ca. 34–40 S.)

### Kap. 1. Warum Skills Geld verdienen (und Chat oft nicht) (~10 S.)
- Druck: Fachkräftemangel, Prozesskosten, Wettbewerb ohne Hype-Zahlen
- Unterschied Chatbot vs. Agent vs. Skill (praxisnah)
- Typische Fehlannahme: „ein Bot pro Abteilung“
- Einstiegsszenarien für GF, IT, Freelancer (je 1 kurzes Beispiel, Quellen später via Vera)

**Grafik-Briefing:** Landkarte „Chat → Assistent → Agent → Skill-Bibliothek“

### Kap. 2. Begriffe, die im Mandat und im Betrieb halten (~12 S.)
- Agent, Skill, Workflow, Routine, Human-in-the-Loop, Owner, Freigabe
- Was ein Skill ist (wiederholbar, prüfbar, übergebbar), *ohne* SKILL.md-Dump
- Was bewusst menschlich bleibt (Strategie, Geld, Recht, Personal, finale Freigabe)
- Glossar-Kern (Verweis Anhang)

**Grafik-Briefing:** Begriffspyramide + Verantwortungsgrenze Mensch/KI

### Kap. 3. Mittelstands-Realitätscheck (~12–16 S.)
- Wann lohnt sich ein Agent, wann nicht (Checkliste)
- Wertstrom statt Abteilungsdenken
- Freelancer-Realität: 1–3 fokussierte Agenten schlagen ein „Agenten-Zoo“
- Abgrenzung zu reiner Chat-Nutzung

**Grafik-Briefing:** Entscheidungsbaum „bauen / skillen / manuell lassen“

---

## Teil II. Fundament (ca. 44–52 S.)

### Kap. 4. Skill-Denken: Bausteine statt Prompt-Chaos (~16 S.)
- Vom einmaligen Prompt zur wiederverwendbaren Fähigkeit
- Gute Skill-Grenzen (ein Outcome, klare Inputs/Outputs)
- Wann Skill statt neuer Agent
- Pflege, Versionierung, Beispiel-Skill-Steckbriefe im Buch; optional öffentlicher Companion nur nach Freigabe

**Grafik-Briefing:** Skill-Lebenszyklus (Idee → Test → Freigabe → Betrieb → Ablage)

### Kap. 5. Organisation & Ownership (~14 S.)
- Human Owner je Outcome
- Freigabegrenzen (was Bots allein dürfen / was Hans/Führung freigibt)
- Handoffs zwischen Rollen (Recherche → Entwurf → Lektorat → Technik als Analogie)
- Kleine Betriebe: Rollen bündeln ohne Zuständigkeit zu verwischen

**Grafik-Briefing:** RACI-light für Agenten-Vorhaben (Owner, Mitwirkende, Informierte)

### Kap. 6. Recht, Risiko, EU AI Act, pragmatisch (~14–18 S.)
- Orientierung, **kein Rechtsersatz**
- Risikoklassen grob verständlich machen (Vera: belastbare Primärquellen)
- Dokumentation, Transparenz, menschliche Aufsicht im Alltag
- Datenminimierung, Zugänge, Secrets nicht in Chats/Vaults
- Was KMU und Solo realistisch zuerst absichern

**Grafik-Briefing:** Risikostufen → Mindestmaßnahmen (Checkliste)

---

## Teil III. Vom Use Case zum laufenden System (ca. 48–56 S.)

### Kap. 7. Methode: Vom Prozess zum Agenten (~16–18 S.)
- Trigger → Inputs → Schritte → Entscheidungen → Owner → Output → Nachweis
- Pilot vor Skalierung
- „Kleinste ausreichende Intervention“ (nichts bauen, vereinfachen, skillen, dann Agent)
- Fallskizze Mittelstand + Fallskizze Freelancer (Quellen/Belege über Vera)

**Grafik-Briefing:** Pipeline-Schema End-to-End

### Kap. 8. Skills bauen und erklären (~16–18 S.)
- Anforderungsbrief statt Code im Buch
- Qualitätskriterien: klar, testbar, fehlertolerant, dokumentiert
- Beispiel-Skills spezifizieren (kein Privat-Repo)
- Anti-Patterns: Skill-Friedhof, Prompt-Kopien, versteckte Rechte

**Diagramm-Briefing:** Skill-Steckbrief-Template (Felder, keine Rohdatei)

### Kap. 9. Betrieb: Routinen, Qualität, Eskalation (~14 S.)
- Wann eine Routine sinnvoll ist (erst nach manuell bewährtem Ablauf)
- Fehlermodus: stale Daten, Doppelarbeit, fehlende Freigabe
- Qualitätsloop: Entwurf → Prüfung → Freigabe → Lernen
- Abschalten und Aufräumen als Führungsaufgabe

### Kap. 10. Nutzen messen und steuern (~12 S.)
- Messgrößen ohne Fantasie-ROI: Zeit, Fehlerquote, Durchlauf, Eskalationen
- Kostenarten (Tool, Review-Zeit, Fehlentscheidung)
- Stop-Kriterien und Review-Rhythmus

**Grafik-Briefing:** einfaches Steuerungs-Cockpit (4–6 Kennzahlen, Platzhalter, echte Werte nur mit Quelle)

---

## Teil IV. Rollenpfade (ca. 34–40 S.)

### Kap. 11. Für die Geschäftsführung (~12 S.)
- Entscheidungen, die nur Führung trifft
- Portfolio: wenige Outcomes, klare Owner
- Kultur: KI als Hebel, nicht als Ausrede
- 10 Führungsfragen vor dem nächsten Agenten

### Kap. 12. Für die IT-Leitung (~12 S.)
- Architektur: Identitäten, Zugänge, Logs, Integrationen
- Schatten-KI vermeiden ohne Innovation zu ersticken
- Betriebshandbuch light
- Schnittstelle Fachbereich ↔ IT

### Kap. 13. Für Freiberufler und Solo-Setups (~10–14 S.)
- Tagesgeschäft automatisieren, ohne zweiten Fulltime-Job zu erzeugen
- 3-Agenten-Muster (z. B. Recherche / Entwurf / Qualität), analog, nicht dogmatisch
- Grenzen: Kundengeheimnisse, Haftung, Sichtbarkeit nach außen
- Preis-/Angebotslogik nur als Denkanstoß, keine erfundenen Marktpreise

---

## Teil V. Umsetzung & Absicherung (ca. 22–28 S.)

### Kap. 14. 90-Tage-Fahrplan (~14 S.)
- Tage 1–30: Use Case wählen, Owner, Ist-Prozess, Pilot
- Tage 31–60: Skill härten, Qualität, erste Routine nur wenn reif
- Tage 61–90: Messen, nachschärfen, entscheiden: skalieren / pausieren / beenden
- Anpassungen für Solo vs. 50–250 MA

**Grafik-Briefing:** 90-Tage-Timeline mit Meilensteinen und Stop-Gates

### Kap. 15. Typische Fehler und Gegenmittel (~8–12 S.)
- Bot-Zoo, fehlender Owner, Code im Buch statt Verweis, Live ohne Freigabe
- „Wir automatisieren den Murks“
- Gegenmittel je Fehler in einem Satz + Verweis zurück ins Kapitel

---

## Anhang (ca. 10–14 S.)

| Anhang | Inhalt |
|--------|--------|
| A | Glossar |
| B | Checklisten (Entscheidungsbaum, Skill-Steckbrief, Pilot-Gate, Sicherheitsmindest) |
| C | Quellenverzeichnis, zentral am Buchende; Kurzbelege im Fließtext; nur geprüfte Einträge (Vera-Status) |
| D | Beispiel-Skills & Weiterführendes (Steckbriefe; kein Privat-Repo; optional Companion nach Freigabe) |
| E | Großes Impressum (Text von Hans, letzte Seite) |

---

## Seitenschätzung (Summe)

| Teil | ~Seiten |
|------|---------|
| Frontmatter | 8–10 |
| Teil I | 34–40 |
| Teil II | 44–52 |
| Teil III | 48–56 |
| Teil IV | 34–40 |
| Teil V | 22–28 |
| Anhang | 10–14 |
| **Gesamt** | **~200–240 → Zielkorridor 180–220 durch knappe Front/Anhang und straffe Kap. 13/15** |

Steuerhebel bei Überlänge: Kap. 13 kürzen, Kap. 15 mit Checklisten im Anhang zusammenziehen, Vorwort auf 2–3 S.

---

## Kapiteldateien (geplant)

```
kapitel/
 00-outline.md ← diese Datei
 01-warum-jetzt.md
 02-begriffe.md
 03-realitaetscheck.md
 04-skill-denken.md
 05-organisation-ownership.md
 06-recht-risiko-ai-act.md
 07-methode-prozess-agent.md
 08-skills-bauen.md
 09-betrieb-qualitaet.md
 10-messen-steuern.md
 11-rolle-geschaeftsfuehrung.md
 12-rolle-it-leitung.md
 13-rolle-freiberufler.md
 14-90-tage-fahrplan.md
 15-fehler-gegenmittel.md
 anhang-a-glossar.md
 anhang-b-checklisten.md
 anhang-c-quellen.md
 anhang-d-skill-repo.md
```

---

## Offene Punkte (nicht blockierend für Outline)

1. Beispiel-Skills fürs Buch spezifizieren (Vera/Mara/Klaus), kein `rmdroid/skills` 
2. Quellenplan an Kapitel koppeln → @Vera (bes. Kap. 1, 3, 6, 7, 10) 
3. Lektor-Checkliste Zielgruppe GF/IT/Solo → @Lara 
4. Großes Impressum-Text → Hans 
5. Konkrete Fallbeispiele: nur mit geprüften Quellen oder klar als anonymisierte Musterkennzeichnung

---

## Nächster Schreibschritt (Mara)

Nach kurzem Go von Alfred/Hans auf diese Gliederung: Kap. 1–2 Entwurf (Orientierung), parallel Vera Quellen für Teil I/II.
