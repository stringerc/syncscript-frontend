// Dark Theme Variants for SyncScript

export interface ThemeColors {
  name: string;
  bg: string;
  surface: string;
  card: string;
  text: string;
  textSecondary: string;
  accent: string;
  accentHover: string;
  border: string;
}

export const DARK_THEMES: Record<string, ThemeColors> = {
  midnight: {
    name: 'Midnight',
    bg: '#0a0a0a',
    surface: '#1a1a1a',
    card: '#2a2a2a',
    text: '#f5f5f5',
    textSecondary: '#cccccc',
    accent: '#8B5CF6',
    accentHover: '#7C3AED',
    border: '#333333'
  },
  nord: {
    name: 'Nord',
    bg: '#2E3440',
    surface: '#3B4252',
    card: '#434C5E',
    text: '#ECEFF4',
    textSecondary: '#D8DEE9',
    accent: '#88C0D0',
    accentHover: '#81A1C1',
    border: '#4C566A'
  },
  dracula: {
    name: 'Dracula',
    bg: '#282a36',
    surface: '#44475a',
    card: '#6272a4',
    text: '#f8f8f2',
    textSecondary: '#f8f8f2',
    accent: '#bd93f9',
    accentHover: '#9580C0',
    border: '#6272a4'
  },
  catppuccin: {
    name: 'Catppuccin Mocha',
    bg: '#1e1e2e',
    surface: '#313244',
    card: '#45475a',
    text: '#cdd6f4',
    textSecondary: '#bac2de',
    accent: '#cba6f7',
    accentHover: '#b4a0e0',
    border: '#585b70'
  },
  tokyo: {
    name: 'Tokyo Night',
    bg: '#1a1b26',
    surface: '#24283b',
    card: '#414868',
    text: '#c0caf5',
    textSecondary: '#a9b1d6',
    accent: '#7aa2f7',
    accentHover: '#6892e6',
    border: '#3b4261'
  },
  gruvbox: {
    name: 'Gruvbox',
    bg: '#282828',
    surface: '#3c3836',
    card: '#504945',
    text: '#ebdbb2',
    textSecondary: '#d5c4a1',
    accent: '#fe8019',
    accentHover: '#d65d0e',
    border: '#665c54'
  }
};

export function applyDarkTheme(themeKey: string): void {
  const theme = DARK_THEMES[themeKey];
  if (!theme) return;

  const root = document.documentElement;
  
  root.style.setProperty('--bg-color', theme.bg);
  root.style.setProperty('--surface-color', theme.surface);
  root.style.setProperty('--card-color', theme.card);
  root.style.setProperty('--text-color', theme.text);
  root.style.setProperty('--text-secondary', theme.textSecondary);
  root.style.setProperty('--accent-color', theme.accent);
  root.style.setProperty('--accent-hover', theme.accentHover);
  root.style.setProperty('--border-color', theme.border);

  // Save preference
  localStorage.setItem('darkThemeVariant', themeKey);
}

export function getCurrentDarkTheme(): string {
  return localStorage.getItem('darkThemeVariant') || 'midnight';
}

export function applyThemeToDocument(themeKey: string): void {
  const theme = DARK_THEMES[themeKey];
  if (!theme) return;

  document.body.style.background = theme.bg;
  document.body.style.color = theme.text;
}
