import { readdirSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, type DefaultTheme } from 'vitepress'

const bookRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const kapitelDir = join(bookRoot, 'kapitel')

const KNOWN_TITLES: Record<string, string> = {
  '00-outline.md': 'Outline',
  '01-warum-skills-geld-verdienen.md': 'Kap. 1 — Warum Skills Geld verdienen',
  '02-begriffe-mandat-betrieb.md': 'Kap. 2 — Begriffe, Mandat, Betrieb',
  '03-realitaetscheck.md': 'Kap. 3 — Mittelstands-Realitätscheck',
  '04-skill-denken.md': 'Kap. 4 — Skill-Denken',
  '05-organisation-ownership.md': 'Kap. 5 — Organisation & Ownership',
  '06-recht-risiko-ai-act.md': 'Kap. 6 — Recht, Risiko, EU AI Act',
}

function stem(file: string): string {
  return file.replace(/\.md$/, '')
}

function titleFor(file: string): string {
  if (KNOWN_TITLES[file]) return KNOWN_TITLES[file]

  const anhang = file.match(/^anhang-([a-z])-(.+)\.md$/i)
  if (anhang) {
    const label = anhang[2].replace(/-/g, ' ')
    return `Anhang ${anhang[1].toUpperCase()} — ${label}`
  }

  const numbered = file.match(/^(\d+)-(.+)\.md$/)
  if (numbered) {
    return `Kap. ${Number(numbered[1])} — ${numbered[2].replace(/-/g, ' ')}`
  }

  return stem(file)
}

function kapitelFiles(): string[] {
  if (!existsSync(kapitelDir)) return []
  return readdirSync(kapitelDir)
    .filter((file) => file.endsWith('.md'))
    .sort()
}

function item(file: string): DefaultTheme.SidebarItem {
  return {
    text: titleFor(file),
    link: `/kapitel/${stem(file)}`,
  }
}

function chapterNumber(file: string): number | null {
  const match = file.match(/^(\d+)-/)
  return match ? Number(match[1]) : null
}

function sidebar(): DefaultTheme.SidebarItem[] {
  const files = kapitelFiles()
  const outline = files.filter((file) => file.startsWith('00-')).map(item)
  const teilI = files.filter((file) => {
    const n = chapterNumber(file)
    return n !== null && n >= 1 && n <= 3
  }).map(item)
  const teilII = files.filter((file) => {
    const n = chapterNumber(file)
    return n !== null && n >= 4 && n <= 6
  }).map(item)
  const later = files.filter((file) => {
    const n = chapterNumber(file)
    return n !== null && n >= 7
  }).map(item)
  const anhang = files.filter((file) => file.startsWith('anhang-')).map(item)

  const groups: DefaultTheme.SidebarItem[] = [
    {
      text: 'Start',
      items: [
        { text: 'Startseite', link: '/' },
        ...outline,
      ],
    },
  ]

  if (teilI.length) {
    groups.push({ text: 'Teil I — Orientierung', items: teilI })
  }
  if (teilII.length) {
    groups.push({ text: 'Teil II — Fundament', items: teilII })
  }
  if (later.length) {
    groups.push({ text: 'Weitere Kapitel', items: later })
  }
  if (anhang.length) {
    groups.push({ text: 'Anhang', items: anhang })
  }

  return groups
}

export default defineConfig({
  lang: 'de-DE',
  title: 'Skills, die Geld verdienen',
  description:
    'Welche Workflows ein Skill verdienen. Bauen, testen, im Mandat einsetzen.',
  // Dist is the GitHub Pages root for rmdroid/cursor → https://rmdroid.github.io/cursor/
  base: '/cursor/',
  srcExclude: ['briefings/**', 'README.md', 'SITE.md', 'exports/**'],
  ignoreDeadLinks: 'localhostLinks',
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    nav: [
      { text: 'Start', link: '/' },
      { text: 'Outline', link: '/kapitel/00-outline' },
      { text: 'Kapitel', link: '/kapitel/01-warum-skills-geld-verdienen' },
    ],
    sidebar: sidebar(),
    outline: { label: 'Auf dieser Seite', level: [2, 3] },
    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: 'Suchen', buttonAriaLabel: 'Suchen' },
          modal: {
            noResultsText: 'Keine Ergebnisse für',
            resetButtonTitle: 'Suche zurücksetzen',
            footer: {
              selectText: 'auswählen',
              navigateText: 'wechseln',
              closeText: 'schließen',
            },
          },
        },
      },
    },
    docFooter: {
      prev: 'Vorheriges Kapitel',
      next: 'Nächstes Kapitel',
    },
    darkModeSwitchLabel: 'Darstellung',
    sidebarMenuLabel: 'Kapitel',
    returnToTopLabel: 'Nach oben',
    outlineTitle: 'Auf dieser Seite',
    lastUpdated: { text: 'Zuletzt geändert' },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/rmdroid/cursor' },
    ],
  },
})
