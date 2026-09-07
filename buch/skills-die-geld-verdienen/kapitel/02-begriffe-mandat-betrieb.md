---
title: "Begriffe, die im Mandat und im Betrieb halten"
chapter: 2
status: entwurf
author: Mara
date: 2026-09-07
book: Skills, die Geld verdienen
---

# Begriffe, die im Mandat und im Betrieb halten

Wenn Geschäftsführung „Agent“ sagt, IT „Workflow“ meint und der Freiberufler „Prompt“ denkt, entstehen teure Missverständnisse: falsche Erwartungen, doppelte Tools, unklare Haftung. Ohne gemeinsame Sprache bleibt Kapitel 1 wirkungslos — jeder nickt bei „Skills verdienen Geld“ und baut danach etwas anderes. Mit gemeinsamen Begriffen können GF, IT und Solo denselben Pilot meinen — und denselben Stopp. Die ausführliche Glossarliste steht im Anhang; hier der Kern, der Entscheidungen trägt.

## Warum Begriffe Geld und Nerven sparen

Im Mandat sieht der Kunde Ergebnisse, Termine und Verlässlichkeit. Intern laufen Entwürfe, Checks und Automatisierung. Wenn intern „der Bot hat das gemacht“ heißt und nach außen niemand erklären kann, wer freigegeben hat, bricht Vertrauen. Begriffe sind deshalb keine Wortspielerei. Sie klären, was automatisiert wird (Skill, Routine, Workflow), wer entscheidet (Owner, Freigabe, Human-in-the-Loop) und wofür ein Agent zuständig ist — und wofür nicht.

Ohne diese Klarheit bauen Teams schnell Systeme, die beeindrucken und im Ernstfall niemanden verantwortlich machen. Mit Klarheit wird aus einer Tool-Diskussion eine Betriebsentscheidung: Brauchen wir einen Skill, einen Agenten, eine Routine — oder zuerst einen sauberen Workflow auf Papier?

Ein praktischer Mindeststandard für jedes Vorhaben lautet: **ein Satz Outcome, ein Owner, eine Freigabegrenze**. Wenn einer der drei fehlt, ist das Vorhaben noch nicht betriebsreif — egal wie gut die Demo wirkt. Die folgenden Begriffe machen genau diese drei Punkte greifbar.

## Die Kernbegriffe

### Workflow

Ein **Workflow** ist der fachliche Ablauf von Trigger bis Ergebnis: Was löst den Schritt aus? Welche Inputs braucht er? Welche Entscheidungen fallen? Wer nimmt ab? Workflows existieren auch ohne KI. KI setzt dort an, wo der Ablauf klar genug ist — oder sie macht den Murks nur schneller. Deshalb gilt: zuerst Workflow verstehen, dann skillen oder agentisieren (Kapitel 7).

Ein Workflow ist die Wahrheitsebene. Skills und Agenten sind Umsetzungsmittel. Wer den Workflow nicht benennen kann, automatisiert Vermutungen — und wer Vermutungen oft genug wiederholt, glaubt irgendwann an eine Routine.

### Routine

Eine **Routine** ist ein Workflow, der so oft und so gleichartig läuft, dass er betrieblich „auf Schiene“ darf — inklusive Trigger, Zuständigkeit und Qualitätscheck. Routinen sind gefährlich, wenn sie zu früh kommen: Automatisieren Sie nur, was manuell schon funktioniert. Kapitel 9 behandelt Betrieb und Eskalation.

Merksatz: **Routine folgt Bewährung, Bewährung folgt manuellem Ablauf.** Wer die Reihenfolge umkehrt, kauft sich Eskalationen ein. Bewährt sich ein Schritt, wird daraus oft der Wunsch nach einem Baustein — dem Skill.

### Skill

Ein **Skill** ist eine wiederholbare, prüfbare, übergebbare Fähigkeit mit einem klaren Outcome. Er ist kein Chat-Verlauf und kein Abteilungs-Bot. Er hat benennbare Inputs und Outputs und Qualitätskriterien, an denen ein Mensch ihn abnehmen kann. Skills sind die Bausteine; Agenten orchestrieren sie. Details und Anti-Patterns: Kapitel 4 und 8. Implementierungsvorlagen: **Beispiel-Skill-Steckbrief (im Buch spezifiziert — kein Privat-Repo, kein Rohcode)** — nicht als Rohcode in diesem Buch.

### Agent

Ein **Agent** verfolgt ein Ziel über mehrere Schritte, kann Werkzeuge oder Daten nutzen und liefert ein Ergebnis entlang von Grenzen. Ein Agent ohne Skills und ohne Owner ist ein Experiment. Ein Agent mit Skills, Logging und Freigabegrenzen ist ein Betriebsmittel. Agenten ersetzen keine Führung und keine fachliche Verantwortung.

In Meetings hilft die Gegenfrage: „Welches Ziel, welche Skills, welche Stopps?“ Wenn die Antwort nur „der Agent macht das“ lautet, fehlt noch der Betrieb — und der Betrieb braucht an definierten Stellen den Menschen.

### Human-in-the-Loop

**Human-in-the-Loop** bedeutet: An definierten Stellen greift ein Mensch ein — prüft, korrigiert, freigibt oder stoppt. Das ist kein Schönheitsfehler der KI, sondern Design. Wo Geld, Recht, Personal oder Außenwirkung betroffen sind, gehört der Mensch in die Schleife. Wo reine Formatierung oder Strukturhilfe läuft, kann die Schleife lockerer sein — aber nie „unsichtbar“.

Human-in-the-Loop ohne benannte Person ist Theater. Die Schleife braucht einen konkreten Rolleninhaber und einen Zeitpunkt: vor Versand, vor Buchung, vor Kundenübergabe. Diese Person ist der Owner — und ohne ihn bleibt jede Freigabe dekorativ.

### Owner

Der **Owner** ist die menschliche Person, die für Outcome, Qualität und Abschaltung verantwortlich ist. Nicht „die IT“, nicht „das Tool“, nicht „wir alle“. Kleine Betriebe und Freiberufler bündeln Rollen — aber Ownership bleibt namentlich. Kapitel 5 vertieft Organisation und Handoffs.

Owner heißt auch: Wer darf den Skill oder Agenten **abschalten**, wenn Qualität kippt? Wer das nicht sagen kann, hat keinen Owner. Und ohne Owner wird Freigabe zur Formsache — genau das darf sie nicht werden.

### Freigabe

**Freigabe** ist die ausdrückliche Erlaubnis, dass ein Entwurf, eine Aktion oder ein Versand nach außen oder in kritische Systeme darf. Freigabe ist Entscheidung, kein Stempel aus Höflichkeit. Was ohne Freigabe rausgeht, ist ein Betriebsrisiko — unabhängig davon, wie gut der Prompt war.

Freigabe kann gestuft sein: intern freigeben, kundenreif freigeben, systemschreibend freigeben. Je kritischer die Wirkung, desto enger die Stufe. Mit diesen Begriffen im Gepäck lässt sich schärfer sagen, was ein Skill ist — und was nur so aussieht.

## Was ein Skill ist — und was nicht

Drei Eigenschaften entscheiden, ob etwas ein Skill ist oder nur ein netter Prompt.

**Wiederholbar.** Derselbe Skill liefert unter gleichen Inputs eine vergleichbare Struktur und Qualität — über Tage, Mandate und Personen hinweg.

**Prüfbar.** Es gibt Kriterien: Pflichtfelder, Checkliste, Abnahme. „Fühlt sich gut an“ reicht nicht für den Betrieb.

**Übergebbar.** Ein Kollege, eine Vertretung oder die IT kann den Skill übernehmen, ohne den Erfinder zu interviewen. Dokumentation gehört dazu — im Repo und im Steckbrief, nicht als Geheimwissen im Chat.

Was ein Skill **nicht** ist: ein einmaliger Chat-Thread; „unser Marketing-Bot“ ohne Outcome-Grenze; eine versteckte Rechteausweitung („darf mal eben alles lesen“); ein Ersatz für Strategie oder Preisentscheidung.

Gute Skill-Grenzen folgen der Regel: **ein Outcome**. Wenn Sie „recherchieren, schreiben, layouten und versenden“ in einen Baustein pressen, verlieren Sie Prüfbarkeit und Freigabe. Besser: getrennte Skills und ein Agent oder Mensch, der orchestriert.

Steckbrief-Denke ohne Code: Name des Skills, Outcome in einem Satz, Inputs, Outputs, Qualitätscheck, Owner, was der Skill bewusst *nicht* darf. Mehr braucht die Fachseite für den Start. Die technische Form liegt im **Beispiel-Skill-Steckbrief (im Buch spezifiziert — kein Privat-Repo, kein Rohcode)**. Was der Skill nicht darf, führt direkt zur nächsten Linie — der Verantwortungsgrenze.

## Was bewusst menschlich bleibt

KI kann entwerfen, strukturieren, vergleichen, formulieren, checklisten. Menschen behalten — in diesem Buch als feste Linie — Verantwortung für Strategie (was wir wollen, wofür wir stehen, welche Mandate wir annehmen), für Geld (Preise, Rabatte, Budgets, Zahlungsbedingungen, wirtschaftliche Zusagen), für Recht (Verträge, Datenschutzentscheidungen, Haftung, regulatorische Einordnung — Orientierung in Kapitel 6, **kein Rechtsersatz**), für Personal (Führung, Bewertung, Kündigung, sensible Personalthemen) und für die **finale Freigabe**: alles, was den Kunden, die Öffentlichkeit oder kritische Systeme erreicht.

Diese Grenze ist die **Verantwortungsgrenze Mensch/KI**. Sie gehört in jedes Schaubild und in jede Freigabepolitik. Wer sie verwischt, spart kurz Review-Zeit und kauft langfristig Eskalationen.

Für Solo-Setups gilt dieselbe Linie in kompakter Form: Die KI darf den Entwurf liefern; der Name unter dem Angebot, die Zusage an den Kunden und die Entscheidung über Scope bleiben bei Ihnen. Im Mandat wird diese Grenze besonders sichtbar — weil der Kunde nur die Außenseite erlebt.

## Mandat-Perspektive: was der Kunde sieht — was intern läuft

Im Mandat zählt die Außenseite: vereinbarte Leistung, Termine und Qualität, Ansprechpartner und Verlässlichkeit, transparente Entscheidungen bei Abweichungen. Intern darf Automatisierung laufen — solange sie die Außenseite nicht untergräbt.

| Sicht | Typisch sichtbar | Typisch intern |
|-------|------------------|----------------|
| Kunde / Auftraggeber | Angebot, Protokoll, Liefergegenstand, Status | Entwürfe, Skill-Läufe, Checklisten, Logs |
| Verantwortung | Vertragspartner, Owner, Freigabe | Agent, Skill, Reviewer |
| Risiko | Falsche Zusage, Datenleck, Qualitätsbruch | stale Daten, Doppelarbeit, fehlende Freigabe |

Regel: **Was nach außen geht, hat einen Namen und eine Freigabe.** Ob der Entwurf von einem Skill kam, ist für den Kunden oft irrelevant — die Haftung und die Qualität sind es nicht. Freiberufler sollten das besonders scharf halten: Kundengeheimnisse gehören nicht in unklare Chat-Kontexte; Tools und Zugänge folgen dem Mandat, nicht dem Neugierprinzip.

Mandatstaugliche Kommunikation nach innen: „Der Skill liefert den Rohbau; Owner X gibt kundenreif frei.“ Mandatstaugliche Kommunikation nach außen: keine Mystifizierung, keine Ausrede „die KI hat das so gesagt“. Der Kunde beauftragt Sie — nicht Ihr Tool.

Wenn interne Automatisierung die Kundensicht verändert (z. B. schnellere Statuszyklen), ist das ein Nutzenversprechen der Organisation. Dann muss Qualität mithalten. Schneller und schlechter ist kein Skill-Erfolg. Damit die Begriffe nicht isoliert bleiben, folgt ein Mini-Ablauf, der sie verkettet.

## Zusammenspiel der Begriffe — ein Mini-Ablauf

Damit die Begriffe nicht isoliert bleiben, ein kurzer Ablauf ohne Technikdetail:

Ein **Workflow** ist beschrieben: Kickoff beendet → Nacharbeit fällig. Ein **Skill** erzeugt Protokollstruktur, offene Fragen, Aktionsliste. Ein **Agent** (optional) orchestriert: Notizen holen, Skill ausführen, Entwurf ablegen. **Human-in-the-Loop:** Owner prüft Inhalt. **Freigabe:** kundenreif oder intern. Erst nach Bewährung wird daraus eine **Routine** mit Trigger.

Fehlt der Workflow, wird der Agent Spekulation. Fehlen Prüfung oder Freigabe, wird die Routine riskant. Das ist die Logik hinter dem ganzen Buch — in einer Seite. Für den Alltag reicht oft die Kurzfassung im Glossar-Kern.

## Glossar-Kern (Kurzfassung)

Die vollständige Liste steht in **Anhang A**. Hier die Arbeitsdefinitionen für Teil I:

| Begriff | Kurz |
|---------|------|
| Workflow | Fachlicher Ablauf Trigger → Ergebnis |
| Routine | Bewährter, betrieblich „auf Schiene“ gesetzter Workflow |
| Skill | Wiederholbare, prüfbare, übergebbare Fähigkeit (ein Outcome) |
| Agent | Zielgerichtete Orchestrierung von Schritten/Skills mit Grenzen |
| Assistent | Reaktive Hilfe am Arbeitsplatz, oft ohne feste Skill-Grenze |
| Chat | Einmaliger Dialog ohne Betriebsobjekt |
| Human-in-the-Loop | Definierte menschliche Prüfung/Freigabe/Stopp |
| Owner | Menschliche Verantwortung für Outcome und Abschaltung |
| Freigabe | Ausdrückliche Erlaubnis für kritische Aktion/Ausgabe |
| Skill-Bibliothek | Gemeinsamer, versionierter Ort für Skills (kein Abteilungs-Zoo) |

Wenn ein Meeting diese Wörter unterschiedlich benutzt: stoppen, angleichen, weiter. Zehn Minuten Begriffsklarheit sparen Wochen Nacharbeit — und jede der drei Leserrollen braucht eine leicht andere Übersetzung derselben Wörter.

## Sprache für drei Leser

**Geschäftsführung** braucht Owner, Freigabe, Portfolio, Stop-Kriterien — nicht Modellnamen. **IT-Leitung** braucht Identitäten, Zugänge, Logs, Integrationsgrenzen, Abschaltbarkeit. **Freiberufler** brauchen schlanke Definitionen: ein Skill, ein Agent maximal als Orchester, klare Kundensicht.

Gemeinsam gilt: Begriffe sind Verträge in Kurzform. Wer „Agent“ sagt und „Chat“ meint, automatisiert Erwartungen, die niemand halten kann.

Ein kurzer Übersetzungstest: Lässt sich Ihr Vorhaben in den Sätzen „Outcome … / Owner … / Freigabe … / Skill …“ erklären? Wenn nicht, ist die Idee noch nicht entscheidungsreif — und dann hilft der Blick von der Begriffsarbeit zur Praxis ohne Code im Buch.

## Vom Begriff zur Praxis — ohne Code im Buch

Dieses Buch erklärt Skills und Agenten **inhaltlich**: Steckbriefe, Qualitätskriterien, Betriebsregeln. Es druckt keine Skill-Rohdateien und keine YAML-Dumps. Wer bauen will, legt Outcome und Grenze fest (Kapitel 4), beschreibt Steckbrief und Tests (Kapitel 8), nutzt Umsetzung und Vorlagen im **Beispiel-Skill-Steckbrief (im Buch spezifiziert — kein Privat-Repo, kein Rohcode)** und sichert Freigabe und Betrieb (Kapitel 5 und 9).

So bleibt das Buch für GF lesbar, für IT anschlussfähig und für Solo umsetzbar — ohne dass ein Buchkapitel zur veralteten Codekopie wird. Bevor der Bau beginnt, lohnt noch der Blick auf die Fallen, in denen Begriffe besonders oft verrutschen.

## Typische Begriffsfallen (kurz)

**„Wir haben einen Agenten“** heißt oft: einen Chat mit Systemprompt. Prüfen: Owner? Skills? Freigabe? Logs?

**„Das ist automatisiert“** heißt oft: jemand drückt noch zehnmal manuell. Prüfen: Routine oder Wunschdenken?

**„KI entscheidet“** heißt in diesem Buch: KI **schlägt vor**; Mensch **entscheidet** in den genannten Bereichen.

**„Jeder darf Skills anlegen“** ohne Pflege führt zum Skill-Friedhof. Versionierung und Aufräumen sind Führungs- und Betriebsaufgabe.

**„Human-in-the-Loop“** ohne Termin und Person ist keine Schleife, sondern Hoffnung.

Regulatorischer Anker (kein Rechtsersatz): Primärquelle ist die **Verordnung (EU) 2024/1689** (AI Act), EUR-Lex: https://eur-lex.europa.eu/eli/reg/2024/1689/oj (**Verifiziert**, Vera). Für die Betriebsbegriffe in diesem Kapitel:

Menschliche Aufsicht und Transparenzpflichten werden im AI Act risikobasiert ausgestaltet; die detaillierte Artikel-Zuordnung folgt in **Kapitel 6** mit Nummern aus dem konsolidierten Text. Bis dahin gilt die Buchdefinition: Human-in-the-Loop und Freigabe sind **betriebliche Designentscheidungen** — juristische Feinheit und Fristen nur mit Fachberatung und Kap. 6.

## Grafik-Briefing

**Titelvorschlag:** Begriffspyramide + Verantwortungsgrenze Mensch/KI

**Teil A — Pyramide (unten nach oben):**

1. **Basis:** Chat / Exploration  
2. **Darüber:** Skills (Bibliothek)  
3. **Darüber:** Assistent / Agent (Orchestrierung)  
4. **Spitze:** Workflow / Routine (fachlicher Betrieb)

**Pfeil seitlich:** „Je höher, desto mehr Ownership, Logging, Freigabe nötig.“

**Teil B — Verantwortungsgrenze (Trennlinie):**

- **Links / unten (KI-geeignet):** strukturieren, entwerfen, checklisten, vergleichen, formulieren in Grenzen.  
- **Rechts / oben (Mensch):** Strategie, Geld, Recht, Personal, finale Freigabe, Abschaltung.

**Fußzeile:** „Skill = wiederholbar · prüfbar · übergebbar“

**Nicht zeigen:** Produktlogos als Empfehlung, ROI, Codeblöcke, erfundene Kennzahlen.

---

### Was die Geschäftsführung entscheidet

Welche Begriffe im Unternehmen verbindlich sind; dass jedes KI-Vorhaben Owner und Freigabegrenze hat; welche Entscheidungen (Geld, Recht, Personal, Strategie, finale Freigabe) nie an Systeme abgegeben werden.

### Was die IT-Leitung umsetzt

Begriffe in Architektur und Betriebshandbuch light übersetzen: Identitäten, Zugänge, Logs, Skill-Bibliothek, Abschaltbarkeit; Schatten-Begriffe („unser Bot“) durch klare Objekte ersetzen.

### Was Solo / Freiberufler morgen starten können

Ein Blatt (oder eine Notiz): eigener Mini-Glossar mit Workflow, Skill, Owner, Freigabe — und die Regel „Was zum Kunden geht, hat Freigabe“. Ersten Skill nur für einen Outcome skizzieren; Bau später über Beispiel-Skill-Steckbrief (im Buch spezifiziert — kein Privat-Repo, kein Rohcode).
