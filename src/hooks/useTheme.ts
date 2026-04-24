import { useEffect, useState } from 'react';

type ThemeMode = 'dark' | 'light' | 'system';
type ResolvedTheme = 'dark' | 'light';

const storageKey = 'portfolio-theme';

function getSystemTheme(): ResolvedTheme {
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

export function useTheme() {
  const [theme, setTheme] = useState<ThemeMode>('system');
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>('dark');

  useEffect(() => {
    const storedTheme = window.localStorage.getItem(storageKey) as ThemeMode | null;
    const nextTheme = storedTheme ?? 'system';
    setTheme(nextTheme);
    setResolvedTheme(nextTheme === 'system' ? getSystemTheme() : nextTheme);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');

    const syncTheme = () => {
      const actualTheme = theme === 'system' ? getSystemTheme() : theme;
      setResolvedTheme(actualTheme);
      document.documentElement.classList.toggle('light', actualTheme === 'light');
    };

    syncTheme();
    mediaQuery.addEventListener('change', syncTheme);

    return () => mediaQuery.removeEventListener('change', syncTheme);
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    window.localStorage.setItem(storageKey, nextTheme);
  };

  return { theme, resolvedTheme, toggleTheme };
}
