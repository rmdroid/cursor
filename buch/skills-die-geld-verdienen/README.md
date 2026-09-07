# Skills, die Geld verdienen

Arbeitsablage im öffentlichen Repo `rmdroid/cursor` unter `buch/skills-die-geld-verdienen/`.

**Titel verbindlich:** Skills, die Geld verdienen

## Lese-Site (VitePress)

Kapitel-Markdown bleibt die Quelle. VitePress rendert sie als klickbare Docs-Site.

- Lokal: `npm i && npm run docs:dev` (in diesem Ordner)
- Production-URL: https://rmdroid.github.io/cursor/
- `base` ist `/cursor/`, weil der VitePress-`dist` als **Pages-Root** dieses Repos deployed wird (nicht der verschachtelte Ordnerpfad).
- Hans: **Settings → Pages → Source: GitHub Actions** — Details in [SITE.md](./SITE.md).

## Struktur
- `kapitel/` — ein Kapitel = eine Markdown-Datei (Quelle für Buch und Site)
- `.vitepress/` — Site-Config; Build-Ausgabe `.vitepress/dist`
- `assets/` — Cover, Impressum-klein, Referenz-DOCX
- `briefings/` — Quellen, Steckbriefe, Pipeline, Lektor-Checkliste (nicht Teil der öffentlichen Site)
- `exports/` — EPUB / DOCX Outputs (lokal/CI)

Private Autor-Repos gehören nicht hierher und nicht ins Buch.
