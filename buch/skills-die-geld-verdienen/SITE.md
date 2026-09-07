# Buch-Site (VitePress)

Lokale Leseansicht und GitHub-Pages-Deploy für **Skills, die Geld verdienen**.

Die Kapitel unter `kapitel/*.md` bleiben die Quelle. VitePress rendert sie; es gibt keine Kopie und keine Skill-Dumps.

## Lokal starten

Im Ordner `buch/skills-die-geld-verdienen/`:

```bash
npm i && npm run docs:dev
```

Gleichwertige Scripts: `npm run dev`, `npm run build`, `npm run preview` (Aliases: `docs:build`, `docs:preview`).

Dev-Server: [http://localhost:5173/cursor/](http://localhost:5173/cursor/)  
(`base` ist `/cursor/` — siehe unten.)

## GitHub Pages — ein Klick bei Hans

**URL nach dem Deploy:** [https://rmdroid.github.io/cursor/](https://rmdroid.github.io/cursor/)

Gewählter Weg: VitePress lebt in diesem Ordner (`.vitepress/`). Der Build (`/.vitepress/dist`) wird als **Pages-Root** des Repos `rmdroid/cursor` veröffentlicht. Deshalb ist `base` **`/cursor/`**, nicht der verschachtelte Pfad `/cursor/buch/skills-die-geld-verdienen/`.

Workflow: `.github/workflows/deploy-docs.yml` (build + `actions/deploy-pages`).

### Der eine Settings-Klick

Falls Actions die Site noch nicht ausspielen darf:

1. Repo **rmdroid/cursor** → **Settings** → **Pages**
2. **Build and deployment → Source:** **GitHub Actions**

Danach reicht ein Push auf `main` (oder **Actions** → **Deploy VitePress book site** → **Run workflow**).

Wenn der Workflow auf der ersten Pages-Freigabe wartet: nach dem Speichern der Source noch einmal den Workflow anstoßen.

## Was die Site nicht veröffentlicht

`briefings/` ist Redaktionsmaterial und per `srcExclude` nicht Teil der öffentlichen Site.
