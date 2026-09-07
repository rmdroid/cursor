# Beispiel-Skill-Steckbriefe

**Buch:** Skills, die Geld verdienen  
**Zweck:** Drei praxisnahe Buch-Beispiele für Mittelstand und Freelancer — als Steckbrief spezifiziert, **ohne** Rohcode, YAML oder technische Skill-Dateien.  
**Stand:** 2026-09-07 · Briefing für Mara

> **Buch-Beispiele — nicht aus privaten Autor-Repos**  
> Diese Steckbriefe sind neu fürs Buch spezifiziert. Sie spiegeln keine privaten Repos (kein `rmdroid/skills`, kein `SKILL.md`-Rohcode, keine YAML-Dumps). Optionaler öffentlicher Companion nur nach ausdrücklicher Freigabe; bis dahin gilt: Steckbrief im Buch, Umsetzung intern.

---

## 1. angebot-aus-kickoff

**Name:** Angebot aus Kickoff-Notizen  
**Kurz-ID (Buch):** `angebot-aus-kickoff`  
**Kontext:** Cover-Anschluss — wiederholbarer Rohbau aus Kickoff, nicht „Zauberdokument“.

**Outcome**  
Aus Kickoff-Notizen entsteht ein strukturierter Angebotsentwurf mit Leistungen, Annahmen, offenen Punkten und nächsten Schritten — bereit für menschliche Freigabe von Preis, Scope und Risiko.

**Inputs**
- Kickoff-Notizen oder kurzer Transkript-Auszug (Stichworte reichen; Vollprotokoll nicht nötig)
- Bekannte Rahmenbedingungen des Mandats (Zeitfenster, Lieferform, Ausschlüsse — soweit schon klar)
- Optional: interne Angebotsstruktur/Vorlage (Abschnittsnamen, Pflichtfelder)
- Explizit *nicht* als Input: Geheimnisse, die nicht in den Entwurf gehören; endgültige Preise „aus dem Bauch“ ohne Owner-Entscheidung

**Outputs**
- Strukturierter Entwurfstext (Abschnitte z. B. Ausgangslage, Leistungsumfang, Annahmen, offene Punkte, nächste Schritte)
- Markierte Annahmen und Lücken („unklar / nachziehen“)
- Platzhalter oder klarer Hinweis für Preis, kommerzielle Konditionen und verbindlichen Scope — **ohne** KI-Zusage
- Kurze interne Checkliste für den Owner (was noch freizugeben ist)

**Qualitätschecks**
- [ ] Alle Pflichtabschnitte der Vorlage/Struktur sind befüllt oder bewusst als offen markiert
- [ ] Annahmen sind sichtbar vom verbindlichen Leistungsumfang getrennt
- [ ] Offene Punkte sind einzeln benannt (kein „irgendwie klären“)
- [ ] Keine Preiszusage, keine rechtlichen Zusagen, keine stillen Scope-Erweiterungen durch die KI
- [ ] Formulierungen sind mandatsfähig als *Entwurf*, nicht als unterschriftsreifes Angebot

**Owner-Rolle**  
Fach-Owner Angebot / Vertrieb bzw. Freelancer selbst: prüft Inhalt, setzt Preis und Scope, gibt kundenreif frei. IT stellt ggf. Vorlage/Ablage bereit, entscheidet nicht über kommerzielle Inhalte.

**Verbote / Stopp**
- Kein Versand an den Kunden aus dem Skill heraus
- Keine erfundenen Preise, Rabatte oder Liefertermine
- Kein „wir können das auch noch“ ohne explizite Notiz im Input
- Stopp, wenn Kickoff-Notizen fehlen oder widersprüchlich sind und kein Owner-Klärungsweg definiert ist
- Stopp bei sensiblen Daten, die nicht in Angebotsentwürfe gehören (Personal, Geheimnisse Dritter)

**Mandat-Hinweis (was der Kunde sieht)**  
Der Kunde sieht ein einheitlich strukturiertes Angebot bzw. einen Angebotsentwurf — nicht den Skill-Namen. Nach außen wirken: klare Leistungen, sichtbare Annahmen, keine stillen KI-Zusagen. Verbindlich wird erst, was der Owner freigibt und versendet.

**Wann Skill vs. Agent**  
**Skill**, wenn der wiederkehrende Schritt „Notizen → strukturierter Rohbau“ das Problem ist und ein Mensch Start und Freigabe auslöst. **Agent** erst, wenn mehrere bewährte Bausteine (z. B. Notizen aufbereiten → Entwurf → interne Qualitätsprüfung) ohne ständiges Handklicken verkettet werden sollen — Versand und Preis bleiben Mensch.

---

## 2. protokoll-entscheidungen

**Name:** Meeting-Protokoll mit Entscheidungen, offenen Punkten und Owner  
**Kurz-ID (Buch):** `protokoll-entscheidungen`  
**Kontext:** Nacharbeit nach Jour fixe, Projektmeeting oder Kundenabstimmung — Struktur statt Gedächtnisprotokoll.

**Outcome**  
Aus Meeting-Notizen oder einem Transkript-Auszug entsteht ein knappes Protokoll mit getroffenen Entscheidungen, offenen Punkten und benannten Ownern — abnahmefähig für den Meeting-Owner.

**Inputs**
- Meeting-Notizen und/oder gekürzter Transkript-Auszug
- Teilnehmerliste bzw. Rollen (wer war im Raum / im Call)
- Optional: Agenda oder Ziel des Termins
- Optional: bekannte Projekt-/Mandatskonventionen (wie Entscheidungen markiert werden)

**Outputs**
- Kurzkopf: Datum, Teilnehmende, Zweck (soweit ableitbar)
- Abschnitt **Entscheidungen** (formuliert als beschlossen, nicht als Wunsch)
- Abschnitt **Offene Punkte** mit Frage/Klärungsbedarf
- Abschnitt **Maßnahmen** mit Owner und — wenn im Input genannt — Zieltermin; sonst „Termin offen / Owner nachziehen“
- Explizite Markierung: was im Input *nicht* klar entschieden war (keine Schein-Beschlüsse)

**Qualitätschecks**
- [ ] Jede Entscheidung ist vom offenen Punkt unterscheidbar
- [ ] Jede Maßnahme hat einen Owner-Namen oder ist als „Owner fehlt“ markiert
- [ ] Keine neuen Zusagen an Kunden oder Lieferanten, die nicht im Input standen
- [ ] Keine stillen Umdeutungen („wir prüfen“ wird nicht zu „wir liefern“)
- [ ] Länge bleibt nutzbar (Protokoll, kein Essay); Unklarheiten sind markiert statt weggeredet

**Owner-Rolle**  
Meeting-Owner bzw. Projektleitung (im Solo-Setup: die Person, die den Termin geführt hat). Freigabe vor Ablage/Versand an Teilnehmende; bei Kundenmeetings zusätzliche Freigabe vor externem Versand.

**Verbote / Stopp**
- Kein automatischer Versand an Teilnehmende oder Kunden
- Keine erfundenen Beschlüsse, Owner oder Termine
- Keine Personalbewertungen, Vertrauliches oder „zwischen den Zeilen“-Deutungen ins Protokoll
- Stopp, wenn das Audio/Transkript unbrauchbar ist oder zentrale Entscheidungen widersprüchlich bleiben
- Stopp bei rechtlichen/vertraglichen Formulierungen, die eine Fachfreigabe bräuchten — nur als offener Punkt markieren

**Mandat-Hinweis (was der Kunde sieht)**  
Intern oft nur Team-Ablage. Wenn das Protokoll mandatsrelevant nach außen geht, sieht der Kunde eine klare Entscheidungs- und Maßnahmenliste — nicht den Skill. Der Kunde darf erwarten: nachvollziehbare Beschlüsse, benannte Zuständigkeiten, keine erfundenen Zusagen.

**Wann Skill vs. Agent**  
**Skill**, wenn der wiederkehrende Outcome „strukturiertes Entscheidungsprotokoll“ ist und Start/Freigabe menschlich bleiben. **Agent** nur, wenn z. B. Notizen holen → Protokoll-Skill → Ablage in Projektordner verkettet werden soll — und auch dann: Versand an Kunden nur nach Freigabe, nicht als Automatik.

---

## 3. status-mandat-kurz

**Name:** Kurzer Mandats-Status an den Kunden  
**Kurz-ID (Buch):** `status-mandat-kurz`  
**Kontext:** Regelmäßige Transparenz im laufenden Mandat — Entwurf nur; Senden ausschließlich nach Freigabe.

**Outcome**  
Aus aktuellen internen Statusdaten entsteht ein kurzer, kundenreifer Statusentwurf (Fortschritt, Blocker, nächste Schritte) — bereit zum Senden **erst nach ausdrücklicher Owner-Freigabe**.

**Inputs**
- Aktueller interner Stand (Stichpunkte, Ticket-/Aufgabenlage, letzte Meilensteine)
- Bekannte Blocker und Abhängigkeiten (Kunde, Lieferant, intern)
- Geplante nächste Schritte und — soweit vereinbart — Blick auf den Zeithorizont
- Ton/Rahmen der Kundenkommunikation (Du/Sie, Formalitätsgrad), falls festgelegt
- Explizit: Kennzeichnung, was bereits kundenkommuniziert vs. nur intern ist

**Outputs**
- Kurzer Statusentwurf (wenige Absätze oder Bullet-Blöcke): erledigt / in Arbeit / blockiert / als Nächstes
- Getrennte Liste **nur intern** (was nicht in die Kundenmail gehört)
- Markierung „Entwurf — Versand gesperrt bis Freigabe“
- Optional: Betreffzeilen-Vorschlag und Anrede — ohne Absendeaktion

**Qualitätschecks**
- [ ] Keine Vermischung von internen Notizen und kundenfähigen Aussagen
- [ ] Blocker sind sachlich, ohne Schuldzuweisung und ohne neue Versprechen
- [ ] Keine Preise, Vertragsänderungen oder Scope-Erweiterungen „nebenbei“
- [ ] Zeitangaben nur, wenn sie im Input belegt oder vom Owner gesetzt sind
- [ ] Entwurf endet mit klarem Freigabe-Hinweis; kein „gesendet“-Zustand durch den Skill

**Owner-Rolle**  
Mandats-Owner / Kundenverantwortung (GF-Projektleitung oder Freelancer). Nur diese Rolle gibt den Versand frei. Vertretung nur mit klarer Übergabe der Freigabeberechtigung.

**Verbote / Stopp**
- **Kein Senden** — weder Mail, Chat noch Portal-Upload aus dem Skill
- Keine erfundenen Fertigstellungsgrade oder Termine
- Keine Weitergabe interner Konflikte, Margen, Personalthemen oder Drittgeheimnisse
- Stopp, wenn der Status veraltet ist oder widersprüchliche Quellen vorliegen
- Stopp bei eskalierenden Themen (Recht, Geldstreit, Vertrauensbruch) — Owner entscheidet den Kanal manuell

**Mandat-Hinweis (was der Kunde sieht)**  
Der Kunde sieht eine kurze, ruhige Statusmeldung mit Fortschritt, Blockern und nächsten Schritten — nicht den Skill und nicht den internen Rohstand. Vertrauen entsteht durch Klarheit und Freigabe, nicht durch Automatik.

**Wann Skill vs. Agent**  
**Skill**, wenn der wiederkehrende Schritt „internen Stand in kundenfähige Kurzform bringen“ ist. **Agent** höchstens für die Vorbereitungskette (Stand sammeln → Status-Skill → Freigabe-Warteschlange). Ein Agent, der Status *ohne* Freigabe versendet, verletzt die Mandatsgrenze — das ist kein Feature, sondern ein Stopp-Kriterium.

---

## Hinweis für Mara — Einbindung im Buch

| Ort | Nutzung |
|-----|---------|
| **Kap. 4 — Skill-Denken** | Kurz referenzieren: die drei Steckbriefe als ausgearbeitete Buch-Beispiele zum Muster „Angebot aus Kickoff“ und zu Grenzen/Freigabe; nicht den ganzen Anhang abdrucken. |
| **Kap. 8 — Skills bauen und erklären** | Als Anschauungsmaterial zum Steckbrief-Template (Felder füllen, Anti-Patterns: Versand im Skill, Alleskönner, fehlender Owner). Ein Steckbrief als Walkthrough, die anderen als Verweis. |
| **Anhang D — Beispiel-Skills & Weiterführendes** | Vollständige drei Steckbriefe ablegen; Header „Buch-Beispiele — nicht aus privaten Autor-Repos“ beibehalten; kein Rohcode, kein Privat-Repo, Companion nur nach Freigabe. |

**Redaktion:** Keine ROI-/Sparzahlen ergänzen. Formulierungen an Kap. 2 (Mandat, Freigabe) und Kap. 5 (Owner) anbinden. Bei Kürzungsdruck: Kap. 4/8 nur Kurzfassung + Verweis Anhang D.
