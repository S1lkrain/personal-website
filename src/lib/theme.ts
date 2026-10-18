export type Theme = 'light' | 'dark'

export const PALETTES = [
  {
    id: 'yellow',
    name: 'Field Yellow',
    colors: ['#f6f4ef', '#141414', '#ffc400'],
  },
  { id: 'forest', name: 'Forest', colors: ['#f1f0e8', '#1c3a2e', '#e39b2d'] },
  { id: 'ocean', name: 'Ocean', colors: ['#f3f6f8', '#0b2545', '#ff6b4a'] },
  { id: 'canyon', name: 'Canyon', colors: ['#f4eee6', '#2a1f18', '#c9552b'] },
  { id: 'glacier', name: 'Glacier', colors: ['#eef3f3', '#15313a', '#2bb3a3'] },
] as const

export type PaletteId = (typeof PALETTES)[number]['id']

// The saved theme and palette are applied before first paint by the inline
// script in index.html; these setters only handle changes after load.

function write(key: string, value: string) {
  try {
    localStorage.setItem(key, value)
  } catch {
    // Storage can be unavailable (private mode); the choice just won't persist.
  }
}

export function getTheme(): Theme {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
}

export function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme
  write('theme', theme)
}

export function getPalette(): PaletteId {
  return (document.documentElement.dataset.palette as PaletteId) ?? 'yellow'
}

export function setPalette(id: PaletteId) {
  document.documentElement.dataset.palette = id
  write('palette', id)
}
