import { useSyncExternalStore } from 'react';

/* The attribute on <html> is the single source of truth. The inline script in
   index.html sets it before first paint, so this module only reads and
   changes it. */
const KEY = 'jagga-theme';
const CHROME = { light: '#E8ECE4', dark: '#131A15' };
const listeners = new Set();

export const getTheme = () =>
  document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';

export function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(KEY, theme);
  } catch {
    /* Private mode or blocked storage: the choice just won't persist. */
  }
  document
    .querySelectorAll('meta[name="theme-color"]')
    .forEach((m) => m.setAttribute('content', CHROME[theme]));
  listeners.forEach((l) => l());
}

const subscribe = (l) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

export const useTheme = () => useSyncExternalStore(subscribe, getTheme, () => 'dark');
