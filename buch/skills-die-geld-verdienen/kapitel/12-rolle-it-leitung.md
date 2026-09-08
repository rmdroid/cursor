---
title: "Für die IT-Leitung"
chapter: 12
status: lektorat-auflagen
author: Mara
date: 2026-09-08
book: Skills, die Geld verdienen
---

# Für die IT-Leitung

Kapitel 11 hat Freigaben, Portfolio und Kultur auf den GF-Tisch gelegt. Dieses Kapitel ist die Naht danach: **IT übersetzt Freigabe und Portfolio in Betrieb**. Nicht „welches Modell ist hip“, sondern Identitäten, Least Privilege, Zugänge, Logs, Integrationen und ein Betriebshandbuch light, das Fachseite und IT gemeinsam tragen.

Geschäftsführung entscheidet Outcomes, Owner und Grenzen. Fachseite trägt Qualität und inhaltliche Freigabe. IT hält die technische Wahrheit: Wer darf was? Welche Version läuft? Wo liegt der Nachweis? Was stoppt, wenn die Grenze reißt? Ohne diese Übersetzung wird aus Kapitel 5 bis 10 ein Wunschzettel. Mit ihr wird dasselbe Mandat betreibbar, für Mittelstand und, in schlanker Form, für Solo ohne Konzernapparat.

Dieses Kapitel setzt voraus, was Kapitel 11 von der GF verlangt: wenige Outcomes, namentliche Owner, rechte Freigabespalte, Mandat zum Soft-Stop. Fehlt das, wird IT Ersatz-Owner oder Bremser ohne Auftrag. Liegt es vor, reicht Architektur light statt Tool-Zoo.

## Architektur light: Identitäten, Zugänge, Logs, Integrationen

Architektur klingt nach Großprojekt. Hier meint sie etwas Schmaleres: **die Mindeststruktur, ohne die Skills und schmale Agenten nicht mandatstauglich sind**. Vier Säulen reichen für den Einstieg. Mehr Technik ohne diese Säulen multipliziert nur Risiko.

**Identitäten.** Jeder produktive Skill und jede Routine braucht eine nachvollziehbare Identität: wer auslöst, unter welchem Konto, in welchem Kontext. „Wir alle nutzen denselben Chat-Login“ ist keine Identität. Es ist geteilte Blindheit. Owner aus Kapitel 5 bleibt Mensch. Die technische Identität ist das Betriebsgegenstück: Zuordnung von Lauf zu Person oder Teamrolle, Vertretung sichtbar, kein stiller Wechsel über geteilte Secrets. Solo bündelt oft beides in einem Kopf, trennt aber kalendarisch Entwurf und Freigabe. IT stellt bereit, dass diese Trennung technisch möglich bleibt.

**Least Privilege.** Zugänge folgen dem Outcome, nicht dem Maximalwunsch der Demo. Was der Steckbrief aus Kapitel 8 als Input braucht, darf gelesen werden. Was als Nicht-Input oder Verbot steht, bleibt draußen. Schreibrechte in kritische Systeme nur mit Freigabe und Nachweis, nie „mal eben CRM aktualisieren“. Kapitel 6 liefert Orientierung zu Datenminimierung und Secrets, ohne Rechtsersatz. Architektur light heißt: Rechte eng starten, erweitern nur mit Owner- und GF-Grenze, widerrufen, wenn Pause oder Ablage greift. Versteckte Rechte sind das Anti-Pattern aus Kapitel 8 mit Infrastruktur-Gewicht.

**Zugänge und Secrets.** API-Keys, Postfach-Tokens und Dateifreigaben gehören nicht in Chat-Verläufe, Folien oder Prompt-Kopien. Ort, Rotation und Widerruf sind IT-Aufgabe. Fachseite braucht Klarheit, *ob* ein Zugang existiert und *für welchen Outcome*, nicht den Rohschlüssel. Schatten-Beschaffung („Fachbereich hat schon lizenziert“) unterläuft Portfolio und Least Privilege. Kapitel 11 hat den Schutz davor als GF-Lieferung an IT gesetzt. Hier gilt die Betriebsregel: Kein produktiver Trigger ohne bekannten Zugangspfad und Widerrufsweg.

**Logs und Nachweis light.** Logs ersetzen keine inhaltliche Prüfung. Sie machen Betrieb prüfbar: Welche Skill-Version? Wann Trigger? Wann Freigabe? Welcher Artefaktort? Kapitel 10 braucht genau diese Events für Zeit, Eskalation und Review-Last, ohne Konzern-BI-Pflicht. Nachweis light ist genug: Version, Triggerzeit, Freigabezeitpunkt, Artefaktort, zuordenbar zum Outcome. Parallel-Wahrheit in Chat-Exports ist kein Log. Bei Pause und Abschalten (Kapitel 9) stoppen Trigger und Messung gemeinsam, sonst erzeugen rostende Dashboards Scheinaktivität.

**Integrationen und stale Daten.** Jede Anbindung an CRM, Ablage, Kalender oder Ticket ist ein Input-Pfad und damit ein stale-Risiko. Kapitel 9 hat stale Daten als Fehlermodus gesetzt: veraltete Notizen, doppelte Status, falsche „aktuelle“ Kundenliste. IT macht Quellen und Aktualität sichtbar (Zeitstempel, Quelle, „Stand von“), statt Hoffnung auf „die KI merkt das schon“. Doppelablagen und zwei „gültige“ Versionen desselben Skills sind Integrations- und Versionsprobleme, keine Modellschwäche. Eine aktuelle Version je Skill, ein Artefaktort, Brief und Bibliotheksdatei synchron: Das ist Architektur light in Alltagssprache.

Die öffentliche Buch-Bibliothek unter https://github.com/rmdroid/cursor/tree/main/buch/skills-die-geld-verdienen/skills ist der technische Ort für die Muster-Dateien. Ihr Portfolio und Ihre Zugangsmatrix sind die Betriebsansicht darüber. IT hält Ort, Version und Widerruf. GF hält Auswahl. Fach-Owner hält Outcome.

## Schatten-KI vermeiden, ohne Innovation zu ersticken

Schatten-KI ist Nutzung außerhalb von Portfolio, Steckbrief und bekannten Zugängen: private Chat-Accounts mit Kundendaten, parallele Prompt-Kopien, „die gute Version von Dienstag“, still lizenzierte Tools. Wer nur verbietet, treibt Nutzung tiefer in den Chat. Wer nur freigibt, bekommt den Zoo aus Kapitel 3. Brauchbare IT-Politik liegt dazwischen: **inventarisieren, an Outcomes koppeln, brauchbare Pfade anbieten**.

Inventarisieren heißt: sichtbar machen, was schon läuft, ohne moralische Großrede. Welche Tools, welche Outcomes, welche Datenpfade, welche Owner-Wahrheit? Kapitel 5 und 8 haben Schatten-Bots und Prompt-Kopien als Organisations- und Bau-Fehler benannt. IT liefert die Inventur-Spur: Zugänge, Lizenzen, Repo-Abweichungen, Doppeldateien. Fachseite liefert die inhaltliche Zuordnung. GF entscheidet, was ins Portfolio darf und was Pause oder Ablage wird.

An Outcomes koppeln heißt: Kein Tool „für die Abteilung“, sondern „dieser Zugang dient Outcome X mit Owner Y“. Was keinem Outcome gehört, ist Experiment mit Ablaufdatum oder Ballast. Experimente brauchen sichtbaren Status (Pilot), enge Rechte und ein Stop-Datum. Sonst werden sie heimlich Routine.

Brauchbare Pfade anbieten heißt konkret: Steckbrief und Muster-Skills bereitstellen, bevor das Verbot kommt. Wer **angebot-aus-kickoff**, **protokoll-entscheidungen** oder **status-mandat-kurz** aus der Buch-Bibliothek (Basis-URL oben) als Startpunkt hat, braucht weniger Schatten-Prompts. Wer nur „kein Chat mit Kundendaten“ hört und keinen freigegebenen Entwurfsweg bekommt, baut den Schatten trotzdem. Innovation bleibt erlaubt im Pilot-Fenster mit Owner, Grenze und Abschaltbarkeit. Fläche ohne diese drei ist kein Fortschritt, sie ist Drift.

Kulturanschluss an Kapitel 11: Schatten nicht moralisieren. Inventarisieren und koppeln. IT ist hier Partner der Fachseite, nicht die geheime Polizei und nicht der Ersatz-Owner.

## Betriebshandbuch light

Kapitel 9 hat das schmale Betriebsblatt je Outcome in Fachsprache gesetzt. Hier die IT-Sicht: Was muss mindestens drinstehen, damit Trigger, Pause und Nachweis nicht im Kopf einer Person leben?

Mindestinhalt je produktivem Outcome oder je aktiver Routine:

- **Trigger:** Was startet den Lauf (Kalender, Ereignis, manueller Kick)? Wer darf auslösen?
- **Skill-Version:** Name, Version oder Änderungsvermerk, Ort in der Bibliothek (nicht fünf Chat-Varianten).
- **Stopp:** Welche Zeichen setzen Soft-Stop oder Pause (fehlende Freigabe, Grenzverletzung, stale Input, Owner fehlt)? Wie wird technisch gestoppt?
- **Owner-Kontakt:** namentlicher Owner, Vertretung, Eskalationsweg zur GF-Grenze bei Geld, Recht, Außenwirkung.
- **Artefaktort:** Wo liegt Entwurf, freigegebene Fassung, Nachweis light? Ein Ort, keine Parallelablage.
- **Identität und Zugänge:** Welche technische Identität, welche Rechte, Widerrufsweg bei Pause oder Ablage.
- **Kopplung Messung:** Welche Events speisen das Cockpit light aus Kapitel 10 (Triggerzeit, Freigabezeit, Eskalation)?

Das Handbuch light ist kein Roman und kein Ticket-System-Ersatz. Eine Seite pro Outcome reicht oft. Es lebt neben dem Steckbrief aus Kapitel 8: Der Steckbrief sagt, *was* der Skill leistet und verbietet. Das Handbuch sagt, *wie* er im Alltag läuft und stoppt. Brief und Handbuch auseinanderlaufen lassen heißt: Spezifikation ohne Betrieb oder Betrieb ohne Spezifikation, beides Friedhof oder Schatten.

Bei Pause: Trigger aus, Rechte eng oder zu, Status sichtbar. Bei Ablage: Zugang widerrufen, Messung stoppen, Datei als abgelegt markieren. Wer nur „pausiert“, um Konflikte zu vermeiden, erzeugt rostende Trigger. Kapitel 9 hat Pause und Ablage getrennt. IT macht beide Zustände betreibbar.

Ein praktischer Hinweis für knappe IT-Teams: Beginnen Sie nicht mit einem Wiki-Großprojekt. Nehmen Sie die drei Outcomes, die laut Portfolio aktiv sind, und füllen Sie die Mindestfelder oben. Was fehlt, ist der nächste Sprint. Was schon stimmt, braucht keine neue Vorlage. So bleibt das Handbuch light ein Arbeitsblatt, kein Schrank.

## Schnittstelle Fachbereich und IT

Die teuerste Naht ist nicht die API. Es ist der Handoff zwischen Fach-Owner und IT, wenn unklar bleibt, wer Outcome trägt und wer Technik begrenzt.

**Gemeinsame Wahrheit ist der Steckbrief** (Kapitel 8), nicht der Chat des letzten Kickoffs und nicht ein IT-Ticket ohne Outcome-Satz. Fachseite füllt Outcome, Inputs, Outputs, Checks, Verbote, Owner. IT übersetzt Nicht-Inputs und Verbote in Zugänge, Logs und Abschaltbarkeit. Wenn der Brief lügt („darf nicht versenden“) und die Integration trotzdem sendet, hat die Schnittstelle versagt, nicht das Modell.

**Handoffs** folgen Kapitel 5: Status am Artefakt, nicht nur im Thread. Entwurf markiert, Freigabe namentlich, nächster Schritt klar. IT stützt Artefaktorte und Statusfelder. Ownership bleibt beim Fach-Owner. IT als Ersatz-Owner endet in betriebenen Systemen ohne inhaltliche Verantwortung und in Fachbereichen, die „die IT soll das freigeben“ rufen.

**Wer darf was** ist die betriebene Freigabetabelle:

- Fach-Owner: Qualität, inhaltliche Freigabe, Pause-Wunsch, Lernen zurück in den Brief.
- IT: Identitäten, Least Privilege, Versionssync zwischen Brief und Datei, Logs, technische Stopp-Möglichkeit, Inventur Schatten und Zugangsdrift.
- GF: rechte Spalte (Geld, Recht, Personal, Strategie, kundenreife Außenwirkung), Portfolio-Entscheidung skalieren / pausieren / beenden, Mandat Soft-Stop.
- Solo: dieselben Hüte sichtbar bündeln, Entwurf und kundenreife Freigabe zeitlich trennen.

Konflikte lösen sich nicht durch mehr Tools. „Fach will Tempo, IT will Kontrolle“ ist oft fehlendes Portfolio: Ohne priorisierte Outcomes wird jedes Experiment zum Notfall. Mit Kapitel-11-Klarheit kann IT ja sagen zu Pilot A und nein zu Fläche ohne Owner, ohne Innovationskiller zu sein.

Praktischer Rhythmus light: kurzer Sync je aktivem Outcome oder monatlich über die Inventur (Zugänge, Versionen, Schatten-Treffer, Log-Lücken). Kein zweites Steuerkreis-Theater. Anschluss an das Portfolio-Review der GF: IT bringt technische Drift und Stopp-Fähigkeit mit, Fach bringt Qualität und Review-Last, GF entscheidet Konsequenz.

Was die Schnittstelle *nicht* braucht: eine eigene KI-Governance-Abteilung als Ausrede, Ownership zu verschieben. Was sie braucht: dieselben Worte für Outcome, Owner, Grenze und Stopp. Wenn Fach „fertig“ sagt und IT „deployt“ meint, ohne Freigabegrenze, entsteht der Live-ohne-Freigabe-Fehler, den Kapitel 15 später sammelt.

## Lesepfad und Naht zu Kapitel 13 bis 15

Dieses Kapitel schließt nicht das Buch. Es setzt den IT-Pfad in Teil IV. Kapitel 13 schrumpft Architektur und Betrieb für Solo: wenige Skills, kalendarische Trennung, Grenzen zu Kundengeheimnis und Außenwirkung ohne eigene IT-Abteilung. Kapitel 14 legt den 90-Tage-Rahmen: Pilot, Härten, Messen, Stop-Gates. Dort werden Identitäten, Handbuch light und Inventur kalendarisch. Kapitel 15 sammelt die Fehler, wenn Technik ohne Owner läuft oder Owner ohne Abschaltbarkeit existiert.

Lesepfad light für IT: Architektur-Säulen oben. Schatten-Politik inventarisieren und anbieten. Betriebshandbuch-Mindestfelder. Schnittstelle über Steckbrief. Querverweise mitdenken: Ownership und RACI light (Kapitel 5), Recht nur Orientierung (Kapitel 6), Steckbrief und Repo-Ort (Kapitel 8), stale Daten und Abschalten (Kapitel 9), Cockpit-Events (Kapitel 10), was IT von GF braucht (Kapitel 11).

Gemeinsam gilt: **IT betreibt Grenzen und Nachweise, nicht Outcomes stellvertretend.** Skills verdienen Geld, wenn Freigabe technisch haltbar ist und Schatten einen brauchbaren Weg in die Bibliothek findet, statt ins Verborgene.

### Was die Geschäftsführung entscheidet

Wenige Outcomes mit namentlichen Ownern und rechter Freigabespalte (Kapitel 11). Mandat zum Soft-Stop bei Grenzverletzung, ohne Sondergenehmigung pro Ticket. Schutz vor Schatten-Beschaffung außerhalb des Portfolios. Priorität vor Fläche: Pilot mit Owner und Stopp vor Abteilungsbots. Abschalten und Aufräumen werden erwartet. IT darf Trigger, Rechte und Messung gemeinsam stoppen. Portfolio-Rhythmus, in dem technische Drift (Zugangsausweitung, Doppelversionen) Konsequenz bekommt, nicht nur eine Folie.

### Was die IT-Leitung umsetzt

Owner-, Freigabe- und Stopp-Entscheidungen in Betrieb übersetzen: Identitäten, Least Privilege, Zugänge mit Widerruf, Logs und Nachweis light, Integrationen mit sichtbarer Aktualität gegen stale Daten. Betriebshandbuch light je aktivem Outcome (Trigger, Version, Stopp, Owner-Kontakt, Artefaktort). Steckbrief und Bibliotheksdatei synchron halten.

Schatten-KI inventarisieren und an Portfolio-Outcomes koppeln. Brauchbare Muster-Pfade anbieten statt nur verbieten. Cockpit-Events mit Pause und Abschalten koppeln. Fachseite mit Artefaktorten stützen, ohne Ownership an Tools zu übertragen. Orientierung aus Kapitel 6 beachten, ohne Rechtsrat zu ersetzen.

### Was Solo / Freiberufler brauchen und morgen starten können

Von „IT“ in Auftrag oder Netzwerk brauchen Solo dieselben Klarheiten in Klein: Welcher Zugang, welche Version, wo der Entwurf liegt, wie Stopp geht. In der eigenen Praxis sind sie oft selbst Betrieb: Dann brauchen sie von sich eine Mini-Matrix Zugang / Outcome / Widerruf und ein Blatt Betrieb light neben dem Steckbrief.

Morgen: Ein Outcome wählen. Steckbrief und Kurzlink danebenlegen, z. B. **status-mandat-kurz**, **protokoll-entscheidungen** oder **angebot-aus-kickoff** unter https://github.com/rmdroid/cursor/tree/main/buch/skills-die-geld-verdienen/skills. Notieren: Trigger, aktuelle Version, Stopp-Zeichen, Artefaktort, welcher Account. Entwurf und kundenreife Freigabe zeitlich trennen. Schatten-Prompts zur selben Sache archivieren oder löschen, nicht parallel „gültig“ lassen. Keinen zweiten Agenten bauen, bevor Version und Stopp stehen. Kapitel 13 fürs schlanke Solo-Setup. Die Architektur-Säulen gelten trotzdem, wenn der Kunde den Output als Ihre Zusage liest.
