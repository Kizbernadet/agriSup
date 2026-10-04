export const THEMES = ["light", "dark"] as const;
export type Theme = (typeof THEMES)[number];

export const THEME_STORAGE_KEY = "agrisup_theme";

export function isTheme(value: unknown): value is Theme {
  return THEMES.includes(value as Theme);
}

export function getActiveTheme(): Theme {
  const current = document.documentElement.dataset.theme;
  return isTheme(current) ? current : "light";
}

export function applyTheme(theme: Theme, persist: boolean): void {
  document.documentElement.dataset.theme = theme;
  if (!persist) return;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Stockage indisponible (navigation privée stricte) : le thème s'applique quand même.
  }
}

export function getStoredTheme(): Theme | null {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return isTheme(stored) ? stored : null;
  } catch {
    return null;
  }
}
