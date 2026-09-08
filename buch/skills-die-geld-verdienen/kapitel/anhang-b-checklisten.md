---
title: "Anhang B: Checklisten"
chapter: B
status: entwurf
author: Mara
date: 2026-09-08
book: Skills, die Geld verdienen
---

# Anhang B: Checklisten

Vier Arbeitsblätter zum Abhaken: Entscheidungsbaum light, Skill-Steckbrief (elf Felder wie Kapitel 8), Pilot-Gate und Sicherheitsmindest (Orientierung aus Kapitel 6, **kein Rechtsrat**). Nutzen Sie die Listen im Meeting, im Solo-Kalender oder als Beilage zum Steckbrief. Begriffe: **Anhang A**. Quellen: **Anhang C**.

## 1. Entscheidungsbaum light

Ziel: die kleinste ausreichende Intervention wählen, bevor jemand „einen Agenten baut“. Reihenfolge strikt von oben nach unten. Haken setzen, was *zutrifft*; bei Zweifel eine Stufe tiefer bleiben.

### Stufe 0: Klärung

- [ ] Trigger und Ergebnis sind in einem Satz benennbar (kein „irgendwie besser mit KI“)
- [ ] Ein menschlicher Owner ist namentlich bereit (Vertretung wenigstens skizziert)
- [ ] Außenwirkung und Freigabegrenze sind grob klar (intern vs. kundenreif)

Wenn ein Haken fehlt: **Workshop zur Klärung**, kein Bauworkshop.

### Stufe 1: Manuell lassen oder vereinfachen

- [ ] Der Schmerz löst sich durch Vorlage, Pflichtfelder, klare Zuständigkeit oder weniger Varianten
- [ ] Wiederholung ist selten oder jedes Mal inhaltlich neu (Kunst statt Standard)
- [ ] Inputs liegen nur „im Kopf von …“ und sind so nicht übergebbar

Wenn hier die Lösung sitzt: **kein Skill, kein Agent**. Vereinfachen zählt als Erfolg.

### Stufe 2: Skillen (ein Outcome)

- [ ] Derselbe Auftragstyp kommt wiederholt oder wird teuer, wenn er jedes Mal neu erfunden wird
- [ ] Inputs und Outputs sind benennbar; Qualitätschecks lassen sich abhaken
- [ ] Ein Mensch will und kann den Output abnehmen
- [ ] Ein Skill am Arbeitsplatz oder Assistenten reicht; Orchestrierung mehrerer Schritte ist *nicht* nötig

Wenn ja: **Skill spezifizieren** (Abschnitt 2), Pilot später. Viele Mandate enden hier bewusst.

### Stufe 3: Agent bauen (schmal orchestrieren)

- [ ] Mehrere Schritte oder Skills müssen sinnvoll nacheinander laufen
- [ ] Trigger und Ziel sind klar; Zugänge, Logs und Abschaltbarkeit sind klärbar
- [ ] Pilot mit Stop-Kriterium ist vereinbart (Abschnitt 3)
- [ ] Skills (oder klare Werkzeugaufrufe) existieren oder werden zuerst spezifiziert, nicht „später“

Wenn nein zu Skills zuerst: **zurück zu Stufe 2**. Agent ohne Instrumente dirigiert Hoffnung.

### Schnelltest Angebot / Protokoll / Status

| Schmerz | Oft Stufe 1 | Oft Stufe 2 | Agent nur wenn |
|---------|-------------|-------------|----------------|
| Angebote uneinheitlich | verbindliche Vorlage, Annahmenpflicht | Skill Angebotsrohbau aus Kickoff | Notizen holen → Entwurf → interne Prüfung verkettet |
| Protokolle fehlen | feste Agenda, Owner je Termin | Skill Entscheidungsprotokoll | Notizen → Protokoll → Ablage orchestriert |
| Status driftet | ein Statusformat, ein Owner | Skill Statusentwurf | Stand sammeln → Entwurf → Freigabe-Warteschlange |

Versand, Preis und kundenreife Zusage bleiben in allen Stufen **Mensch**.

## 2. Skill-Steckbrief (elf Felder)

Dieselbe Feldliste wie in **Kapitel 8**. Vor dem Pilot jedes Feld füllen oder bewusst als offen markieren. Rohcode gehört ins Repo, nicht auf dieses Blatt.

| # | Feld | Abhakbar / Notiz |
|---|------|------------------|
| 1 | **Name** (menschenlesbar) und **Kurz-ID** (stabil, klein, ohne Leerzeichen) | [ ] gesetzt |
| 2 | **Outcome** (ein Satz, abnehmbar) | [ ] ein Outcome, kein Alleskönner |
| 3 | **Inputs** (Form, Pflicht vs. optional) | [ ] Pflicht klar |
| 4 | **Nicht als Input** (Datenminimierung, Geheimnisse, Bauchpreise) | [ ] Verbote notiert |
| 5 | **Outputs** (was entsteht und was bewusst nicht) | [ ] Grenze sichtbar |
| 6 | **Qualitätschecks** (abhakbare Liste) | [ ] mindestens 3 Checks |
| 7 | **Owner-Rolle** (wer freigibt; Vertretung) | [ ] Name oder Rolle |
| 8 | **Verbote / Stopp** (Versand, Erfinden, Eskalationsfälle) | [ ] Stopp-Fälle da |
| 9 | **Mandat-Hinweis** (was der Kunde sieht) | [ ] Kundensicht klar |
| 10 | **Skill vs. Agent** (wann der Skill reicht) | [ ] Entscheidung begründet |
| 11 | **Repo-Verweis** (öffentliche Datei, keine Privatquelle) | [ ] URL/Pfad gesetzt |

### Qualitätskriterien über dem Steckbrief

- [ ] **Klar:** Outcome und Grenze ohne „irgendwie“
- [ ] **Testbar:** Beispiel-Input und Fail-Kriterium benennbar
- [ ] **Fehlertolerant:** Lücken und Widersprüche werden markiert, nicht weggeredet; keine stillen Zusagen
- [ ] **Dokumentiert:** Steckbrief und (später) Repo-Datei synchron; kein Geheimwissen nur im Chat

Fehlt eines der vier: **kein „wir rollen das aus“**.

### Anti-Pattern-Check (kurz)

- [ ] Kein Skill-Friedhof: Owner und aktuelle Version sichtbar; Ungenutztes abgelegt
- [ ] Keine Prompt-Kopien parallel zur Bibliothek
- [ ] Keine versteckten Rechte (Schreibzugriff, Versand, CRM „mal eben“)

Ausgefüllte Muster: **Anhang D** (`angebot-aus-kickoff`, `protokoll-entscheidungen`, `status-mandat-kurz`).

## 3. Pilot-Gate

Vor dem Start jedes Piloten. Fehlt ein Haken, ist der „Pilot“ eine Demo mit Publikum (Kapitel 7).

### Spezifikation und Intervention

- [ ] Pipeline grob gefüllt: Trigger → Inputs → Schritte → Entscheidungen → Owner → Output → Nachweis
- [ ] Intervention gewählt (meist Skill; Agent nur mit Begründung aus Abschnitt 1)
- [ ] Steckbrief (Abschnitt 2) für den Kern-Skill ausgefüllt
- [ ] Auftragstyp oder Mandatsreihe begrenzt (kein „ganze Firma“)

### Ownership und Grenzen

- [ ] Owner namentlich; Vertretung wenigstens benannt
- [ ] Freigabegrenze intern vs. kundenreif schriftlich
- [ ] Rechte Spalte klar: Geld, Recht, Personal, Strategie, kundenreife Außenwirkung bleiben Mensch/Führung
- [ ] Stop-Kriterium formuliert und vom Owner (ggf. GF) bestätigt

Beispiel-Formulierung Stopp: „Zurück auf manuell, wenn Review dauerhaft länger dauert als der frühere Pfad und Inputs nicht besser werden.“

### Betrieb light vor Fläche

- [ ] Zugänge und Secrets mit IT (oder Solo-Disziplin) geklärt; keine Keys im Chat
- [ ] Nachweis light: Version, Triggerzeit, Freigabezeitpunkt, Artefaktort
- [ ] Technische oder organisatorische Abschaltbarkeit vorhanden
- [ ] Baseline geplant oder erhoben (gleiche Auftragstypen, vor Pilot-Jubel)

### Während des Piloten (wöchentlich light)

- [ ] Inputs kommen rechtzeitig und brauchbar
- [ ] Pflichtfelder / Checks tragbar; Eskalationen werden genutzt, nicht unterdrückt
- [ ] Rohbau rutscht nicht still nach außen
- [ ] Owner würde denselben Ablauf nächste Woche wieder so starten

### Ausgang nach Pilot

| Entscheidung | Bedingung (Check) |
|--------------|-------------------|
| Skalieren (Geltungsbereich erweitern) | [ ] Inputs und Review tragen; Freigabe hält; Stopp bleibt gültig |
| Härten (Skill nachschärfen, noch Pilot) | [ ] Nutzen erkennbar, aber Checks/Inputs noch wackelig |
| Pausieren | [ ] Stop-Kriterium greift oder Owner fehlt |
| Beenden / ablegen | [ ] Kein tragfähiger Outcome; Aufräumen zählt als Erfolg |

Keine Fantasie-ROI-Folie als Gate-Ersatz.

## 4. Sicherheitsmindest (Orientierung, kein Rechtsrat)

Angelehnt an **Kapitel 6**. Ersetzt keine anwaltliche Prüfung, keine DSFA und keine konformitätsrechtliche Beratung. Vor verbindlichen Freigaben: konsolidierte Fassung der KI-Verordnung und Fachberatung bei Zweifel. Details und URLs: **Anhang C**.

### Inventar und Verbote

- [ ] Inventar light: Welche Tools, Skills, Agenten laufen? Owner? Außenwirkung? Kundenkontakt?
- [ ] Art.-5-Nähe geprüft: nichts betreiben, was in Verbotsnähe rutscht; Pilot ist keine Ausnahme vom Verbot
- [ ] Bei Anhang-III-/Anhang-I-Nähe (z. B. HR-Vorauswahl, Biometrie, essentielle Dienste): früh stoppen und Einstufung klären, nicht „später“

### Transparenz und Aufsicht

- [ ] Transparenz (Art. 50, relevant ab 02.08.2026): Kennzeichnung dort, wo Nutzer mit KI interagieren oder synthetische Inhalte ausgespielt werden
- [ ] Human-in-the-Loop mit Person und Zeitpunkt bei Kundenkommunikation, HR-nahen, Finanz- und Rechtsentwürfen
- [ ] Steckbrief enthält Grenzen, Owner, Stopp (Dokumentation light; Hochrisiko braucht mehr)

### Daten, Zugänge, Secrets

- [ ] Datenminimierung: nur Inputs, die der Outcome braucht
- [ ] Least Privilege: keine Admin-Rechte „weil Demo einfacher war“; Schreibrechte nur mit Freigabe und Spur
- [ ] Secrets nicht in Chats, Skill-Texten, Folien oder geteilten Schein-Vaults
- [ ] Mandantentrennung: Kundendaten eines Mandats nicht in fremde Kontexte ohne klare Basis
- [ ] Aufbewahrung/Löschung für Entwürfe und Logs grob geregelt („ewig im Chat“ ist kein Archiv)

### Kompetenz und Betrieb

- [ ] Kurze Förderung der KI-Kompetenz (Art. 4): Was darf das System? Was nicht? Wann eskalieren?
- [ ] Abschaltbarkeit und Logging für produktive Läufe
- [ ] Schatten-KI inventarisiert und an Portfolio gekoppelt (nicht nur verboten)
- [ ] Betriebshandbuch light je aktivem Outcome vorhanden oder terminiert

### Solo auf einer Seite

- [ ] Liste genutzter KI-Tools
- [ ] Kein Art.-5-Risiko bewusst
- [ ] Kundendaten nicht in fremde Chats
- [ ] Keys nicht im Prompt
- [ ] Alles Kundenreife hat Freigabe
- [ ] KI-Nutzung erkennbar, wo nötig
- [ ] Nächster Skill: ein Outcome, Owner „ich“

**Hinweis:** Fristen und Artikelnummern können sich durch konsolidierte Fassungen und Leitlinien ändern. Dieses Blatt steuert Betriebsmindest, nicht die Rechtsberatung.

## Nutzungshinweis

GF nutzt Abschnitte 1 und 3 für Portfolio und Go/No-Go. IT nutzt Abschnitte 2 und 4 für Rechte, Logs und Abschaltung. Solo druckt Abschnitt 2 und 3 auf ein Blatt und fährt eine Woche mit Haken. Was nicht abhakbar ist, ist noch nicht entscheidungsreif.
