import { readdirSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, type DefaultTheme } from 'vitepress'

const bookRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const kapitelDir = join(bookRoot, 'kapitel')

const KNOWN_TITLES: Record<string, string> = {
  '01-warum-skills-geld-verdienen.md': 'Kap. 1: Warum Skills Geld verdienen',
  '02-begriffe-mandat-betrieb.md': 'Kap. 2: Begriffe, Mandat, Betrieb',
  '03-realitaetscheck.md': 'Kap. 3: Mittelstands-Realitätscheck',
  '04-skill-denken.md': 'Kap. 4: Skill-Denken: Bausteine statt Prompt-Chaos',
  '05-organisation-ownership.md': 'Kap. 5: Organisation & Ownership',
  '06-recht-risiko-ai-act.md': 'Kap. 6: Recht, Risiko, EU AI Act: pragmatisch',
  '07-methode-prozess-agent.md': 'Kap. 7: Methode: Vom Prozess zum Agenten',
  '08-skills-bauen.md': 'Kap. 8: Skills bauen und erklären',
  '09-betrieb-qualitaet.md': 'Kap. 9: Betrieb: Routinen, Qualität, Eskalation',
  '10-messen-steuern.md': 'Kap. 10: Nutzen messen und steuern',
  '11-rolle-geschaeftsfuehrung.md': 'Kap. 11: Für die Geschäftsführung',
  '12-rolle-it-leitung.md': 'Kap. 12: Für die IT-Leitung',
  '13-rolle-freiberufler.md': 'Kap. 13: Für Freiberufler und Solo-Setups',
  '14-90-tage-fahrplan.md': 'Kap. 14: 90-Tage-Fahrplan',
  '15-fehler-gegenmittel.md': 'Kap. 15: Typische Fehler und Gegenmittel',
  'anhang-a-glossar.md': 'Anhang A: Glossar',
  'anhang-b-checklisten.md': 'Anhang B: Checklisten',
  'anhang-c-quellen.md': 'Anhang C: Quellenverzeichnis',
  'anhang-d-beispiel-skills.md': 'Anhang D: Beispiel-Skills und Weiterführendes',
}

function stem(file: string): string {
  return file.replace(/\.md$/, '')
}

function titleFor(file: string): string {
  if (KNOWN_TITLES[file]) return KNOWN_TITLES[file]

  const anhang = file.match(/^anhang-([a-z])-(.+)\.md$/i)
  if (anhang) {
    const label = anhang[2].replace(/-/g, ' ')
    return `Anhang ${anhang[1].toUpperCase()}: ${label}`
  }

  const numbered = file.match(/^(\d+)-(.+)\.md$/)
  if (numbered) {
    return `Kap. ${Number(numbered[1])}: ${numbered[2].replace(/-/g, ' ')}`
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
  const files = kapitelFiles().filter((file) => file !== '00-outline.md')
  const teilI = files.filter((file) => {
    const n = chapterNumber(file)
    return n !== null && n >= 1 && n <= 3
  }).map(item)
  const teilII = files.filter((file) => {
    const n = chapterNumber(file)
    return n !== null && n >= 4 && n <= 6
  }).map(item)
  const teilIII = files.filter((file) => {
    const n = chapterNumber(file)
    return n !== null && n >= 7 && n <= 10
  }).map(item)
  const teilIV = files.filter((file) => {
    const n = chapterNumber(file)
    return n !== null && n >= 11 && n <= 13
  }).map(item)
  const teilV = files.filter((file) => {
    const n = chapterNumber(file)
    return n !== null && n >= 14
  }).map(item)
  const anhang = files.filter((file) => file.startsWith('anhang-')).map(item)

  const groups: DefaultTheme.SidebarItem[] = [
    {
      text: 'Start',
      items: [{ text: 'Startseite', link: '/' }],
    },
  ]

  if (teilI.length) {
    groups.push({ text: 'Teil I: Orientierung (Kap 1-3)', items: teilI })
  }
  if (teilII.length) {
    groups.push({ text: 'Teil II: Fundament (Kap 4-6)', items: teilII })
  }
  if (teilIII.length) {
    groups.push({ text: 'Teil III: Methode und Betrieb (Kap 7-10)', items: teilIII })
  }
  if (teilIV.length) {
    groups.push({ text: 'Teil IV: Rollen (Kap 11-13)', items: teilIV })
  }
  if (teilV.length) {
    groups.push({ text: 'Teil V: Umsetzung und Absicherung (Kap 14-15)', items: teilV })
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
  srcExclude: [
    'briefings/**',
    'README.md',
    'SITE.md',
    'exports/**',
    'skills/**',
    'assets/**/*.md',
    'kapitel/00-outline.md',
  ],
  ignoreDeadLinks: 'localhostLinks',
  cleanUrls: true,
  lastUpdated: true,
  vite: {
    plugins: [
      {
        name: 'resolve-kapitel-book-assets',
        resolveId(id, importer) {
          if (!importer?.includes(`${bookRoot}/kapitel/`)) return
          if (!id.includes('assets/grafiken/')) return
          const relative = id.replace(/^\.\//, '')
          if (relative.startsWith('assets/')) {
            return join(bookRoot, relative)
          }
        },
      },
    ],
  },
  themeConfig: {
    nav: [
      { text: 'Start', link: '/' },
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
