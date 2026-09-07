# Export-Pipeline (Klaus)

Stand: 2026-09-07

## Skill-Repo
- `https://github.com/rmdroid/skills` = **Hans' Privat-Skills** — NICHT ins Buch, NICHT freigeben, NICHT als Companion.
- Buch: Beispiel-Skills recherchieren oder neu entwickeln; im Text erklären, kein SKILL.md-Dump. Öffentlicher Companion nur nach expliziter Freigabe durch Hans.

## MD → DOCX (DIN A5, 2 cm Rand)
1. Kapitel-MD in `kapitel/` (Pandoc-tauglich: `#`/`##`, Listen, Tabellen).
2. Pandoc: `--reference-doc` oder YAML-Metadata für A5 + Ränder 2 cm; Schrift/Zeilenabstand später fixieren.
3. Cover/Assets einbinden; großes Impressum zuletzt von Hans.
4. Ausgabe: `exports/skills-die-geld-verdienen.docx`

## MD → EPUB v2 (epubli)
1. Pandoc `--to epub2` mit Cover aus `assets/`.
2. Inhaltsverzeichnis aus Kapitel-Überschriften; Metadaten Titel/Autor/Untertitel.
3. Keine EPUB3-only Features (kein fixed-layout, sparsam mit CSS).
4. Ausgabe: `exports/skills-die-geld-verdienen.epub` — vor Upload in epubli prüfen (Cover, Impressum-Platz).

## Grafiken
PNG/SVG aus Briefings; in MD als relative Pfade unter `assets/`. Raster für EPUB, Vektor wo DOCX erlaubt.

## Ablage-Repo
- Buch bauen/ablegen: `https://github.com/rmdroid/cursor`
