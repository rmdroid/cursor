---
title: "Anhang A: Glossar"
chapter: A
status: entwurf
author: Mara
date: 2026-09-08
book: Skills, die Geld verdienen
---

# Anhang A: Glossar

Dieses Glossar ergänzt die Kurzfassung in **Kapitel 2**. Es übersetzt die Betriebsbegriffe des Buches in Mittelstandssprache: was GF entscheidet, was IT betreibt, was Solo morgen starten kann. Keine Code-Dumps, keine Fantasie-ROI, kein Rechtsersatz. Geprüfte Quellen und URLs stehen in **Anhang C**.

Leselogik: Zuerst die Bausteine vom Ablauf bis zur Orchestrierung, dann Verantwortung und Freigabe, dann Betrieb und Steuerung. Alphabetisch finden Sie die Begriffe in der Übersichtstabelle am Ende.

## Ablauf und Fähigkeiten

**Workflow.** Fachlicher Ablauf von einem erkennbaren Trigger bis zu einem erkennbaren Ergebnis. Beispiel: Kickoff beendet, Nacharbeit fällig, Protokoll abgelegt. Ein Workflow beschreibt *was* passiert, nicht welches Modell läuft. Ohne benannten Workflow wird jeder Agent Spekulation.

**Routine.** Ein bewährter Workflow, der betrieblich „auf Schiene“ gesetzt ist: Trigger bekannt, Inputs auffindbar, Freigabegrenze klar, Stopp möglich. Routinen entstehen erst nach manueller Bewährung und nach einem Pilot mit Stop-Kriterium (Kapitel 7 und 9). Eine Routine ohne Owner ist kein Betrieb, sondern Automatismus ohne Haftung.

**Skill.** Wiederholbare, prüfbare, übergebbare Fähigkeit mit **einem** Outcome. Wiederholbar heißt: derselbe Auftragstyp liefert dieselbe Struktur. Prüfbar heißt: Checkliste und Pflichtfelder statt „fühlt sich gut an“. Übergebbar heißt: Vertretung oder IT kann den Skill übernehmen, ohne den Erfinder zu interviewen. Der Skill ist das Betriebsobjekt dieses Buches; die technische Datei liegt im öffentlichen Repo, nicht als Dump im Text.

**Agent.** Zielgerichtete Orchestrierung von Schritten und Skills mit Grenzen. Der Agent holt, verkettet, legt ab. Er ersetzt weder Owner noch Freigabe. Erst sinnvoll, wenn mehrere bewährte Bausteine orchestriert werden müssen und Zugänge, Logs und Stopp geklärt sind. Ein Agent ohne Skills ist Theater.

**Assistent.** Reaktive Hilfe am Arbeitsplatz, oft ohne feste Skill-Grenze. Nützlich zum Tippen und Sortieren. Kein Ersatz für Steckbrief, Version und Freigabe. Wer Assistent und Skill vermischt, bekommt Prompt-Kopien statt Bibliothek.

**Chat.** Einmaliger Dialog ohne Betriebsobjekt. Chat darf Werkbank sein. Chat darf nicht stiller Prozess mit Kundenzusagen werden. Sobald dieselbe Struktur und dieselbe Checkliste mehrfach tragen, ist der Weg zum Skill kurz.

**Skill-Bibliothek.** Gemeinsamer, versionierter Ort für Skills (kein Abteilungs-Zoo). Im Buch verweisen wir auf die öffentliche Buch-Bibliothek unter https://github.com/rmdroid/cursor/tree/main/buch/skills-die-geld-verdienen/skills. Privatkopien und „die gute Version von Dienstag“ gehören nicht zur Bibliothek.

## Verantwortung und Mandat

**Outcome.** Abnehmbares Ergebnis in einem Satz: Was ist fertig, wenn der Skill oder die Pipeline gelungen ist? Outcomes steuern Portfolio und Messung. „Wir nutzen KI“ ist kein Outcome. „Aus Kickoff-Notizen liegt ein strukturierter Angebotsentwurf zur Owner-Freigabe vor“ ist eines.

**Owner.** Menschliche Verantwortung für Outcome, Qualität und Abschaltung. Der Owner ist namentlich, vertretbar und darf pausieren. Owner ohne Freigaberecht ist Dekoration. Freigabe ohne Owner ist Blindflug. Solo bündelt oft beides in einem Kopf, trennt aber Entwurf und Freigabe kalendarisch.

**Human-in-the-Loop.** Definierte menschliche Prüfung, Korrektur, Freigabe oder Stopp an benannten Stellen. Schleife braucht Person und Zeitpunkt: vor Versand, vor Buchung, vor Kundenübergabe. Human-in-the-Loop ohne Termin und Person ist Hoffnung, kein Design (Kapitel 2 und 6).

**Freigabe.** Ausdrückliche Erlaubnis für eine kritische Aktion oder Ausgabe. Intern abnahmefähig und kundenreif sind zwei Stufen. Rohbau darf entstehen; verbindlich wird erst, was der Owner freigibt. Automatischer Versand aus dem Skill ist im Buch-Muster verboten.

**Mandat.** Der sichtbare Auftrag nach außen: Ergebnisse, Termine, Verlässlichkeit. Der Kunde sieht Angebot, Protokoll, Status, nicht den Skill-Namen und nicht den internen Rohlauf. Mandatsgrenze heißt: Was nach außen geht, hat Freigabe; Kundendaten bleiben im vereinbarten Rahmen.

**Steckbrief.** Anforderungsbrief für einen Skill ohne Rohcode: Name, Outcome, Inputs, Nicht-Inputs, Outputs, Qualitätschecks, Owner, Verbote/Stopp, Mandat-Hinweis, Skill vs. Agent, Repo-Verweis. Elf Felder, Kapitel 8 und Anhang B. Der Steckbrief ist die gemeinsame Wahrheit von Fachseite und IT.

## Betrieb und Steuerung

**Pilot.** Begrenzter Bewährungsraum vor Skalierung: ein Auftragstyp oder eine Mandatsreihe, ein Owner, eine Skill-Version (oder schmaler Agent), ein Zeitraum, ein Stop-Kriterium. Der Pilot klärt Inputs, Review-Tragbarkeit und Freigabegrenze. Er klärt nicht, ob „die Organisation KI-ready“ ist.

**Baseline.** Vorher-Messung am selben Auftragstyp: Zeiten, Fail-Arten, Review-Last *bevor* der Pilot als Erfolg gefeiert wird. Ohne Baseline ist jede Zahl eine Geschichte (Kapitel 10). Baseline ist oft eine Woche manuell mit Checkliste.

**Stop-Kriterium / Soft-Stop.** Vorab vereinbarte Bedingung, die zurück auf manuell, auf Pilot-Modus oder in die Pause setzt. Beispiele: Review dauerhaft länger als der frühere Pfad und Inputs werden nicht besser; Freigabegrenze wird unterlaufen; Owner fehlt; Inputs sind stale oder widersprüchlich. Soft-Stop ist das betrieblich vorgesehene Abbremsen ohne Drama. Hard-Stop betrifft absolute Grenzen (z. B. Verbotsnähe, Geheimnisbruch) und Abschalten.

**Eskalation / Pause.** Vorgesehener Ausgang, kein Makel. Eskalation: Lücke, Widerspruch, Rechts-/Geldnähe, fehlende Freigabe, stale Input → Owner entscheidet nachschärfen, manuell, Pause oder Führungsfreigabe. Pause: Trigger aus, Version markieren, Messung mitstoppen. Wer Eskalation unterdrückt, fliegt blind.

**Nachweis light.** Schlanke Spur statt Konzernbürokratie: Skill-Version, Triggerzeit, Freigabezeitpunkt, Artefaktort, zuordenbar zum Outcome. Chat-Export ist kein Nachweis. Nachweis light speist Lernen und das Cockpit aus Kapitel 10.

**Betriebshandbuch light.** Eine Seite pro produktivem Outcome oder aktiver Routine: Trigger, Stopp-Zeichen, Owner-Kontakt, Artefaktort, Version/Zugänge, Kopplung zur Messung. Steckbrief sagt *was* der Skill leistet; Handbuch sagt *wie* er läuft und stoppt (Kapitel 12).

**Schatten-KI.** Nutzung außerhalb von Portfolio, Steckbrief und bekannten Zugängen: private Chats mit Kundendaten, parallele Prompt-Kopien, still lizenzierte Tools. Gegenmittel: inventarisieren, an Outcomes koppeln, brauchbare Pfade anbieten. Nur verbieten erstickt Innovation und treibt Schatten tiefer.

**Portfolio (Outcomes).** Wenige priorisierte Outcomes mit Owner, Status (aktiv / pausiert / abgelegt) und Freigabegrenze. Portfolio steuert GF-Entscheidungen skalieren / pausieren / beenden. Abteilungsbots und Tool-Listen sind kein Portfolio.

## Übersicht (alphabetisch)

| Begriff | Kurz |
|---------|------|
| Agent | Orchestrierung von Schritten/Skills mit Grenzen |
| Assistent | Reaktive Hilfe, oft ohne feste Skill-Grenze |
| Baseline | Vorher-Messung am selben Auftragstyp |
| Betriebshandbuch light | Eine Seite: Trigger, Stopp, Owner, Artefakt, Version |
| Chat | Einmaliger Dialog ohne Betriebsobjekt |
| Eskalation / Pause | Vorgesehener Ausgang bzw. bewusstes Abschalten |
| Freigabe | Ausdrückliche Erlaubnis für kritische Ausgabe/Aktion |
| Human-in-the-Loop | Menschliche Prüfung/Freigabe/Stopp mit Person und Zeitpunkt |
| Mandat | Sichtbarer Auftrag nach außen; Freigabe vor Kundenwirkung |
| Nachweis light | Version, Trigger, Freigabe, Artefaktort |
| Outcome | Abnehmbares Ergebnis in einem Satz |
| Owner | Menschliche Verantwortung für Outcome und Abschaltung |
| Pilot | Begrenzter Bewährungsraum vor Skalierung |
| Portfolio (Outcomes) | Wenige priorisierte Outcomes mit Owner und Status |
| Routine | Bewährter, betrieblich auf Schiene gesetzter Workflow |
| Schatten-KI | Nutzung außerhalb Portfolio, Steckbrief, bekannter Zugänge |
| Skill | Wiederholbare, prüfbare, übergebbare Fähigkeit (ein Outcome) |
| Skill-Bibliothek | Gemeinsamer versionierter Ort für Skills |
| Soft-Stop / Stop-Kriterium | Vorab vereinbarter Rückfall oder Pause |
| Steckbrief | Elf-Felder-Spec ohne Rohcode |
| Workflow | Fachlicher Ablauf Trigger → Ergebnis |

**Verweise:** Kurzfassung und Begriffspyramide in **Kapitel 2**; Quellen in **Anhang C**; Checklisten in **Anhang B**; ausgefüllte Muster-Steckbriefe in **Anhang D**.
