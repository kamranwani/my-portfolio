"use client";

import { createContext, useCallback, useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { Theme } from "../types/Theme";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState(Theme.IvoryGold);

  useEffect(() => {
    const themeNow = localStorage.getItem("theme");
    const foundTheme = Object.values(Theme).find((theme) => theme === themeNow);
    if (foundTheme) setThemeState(foundTheme);
    else setThemeState(Theme.IvoryGold);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const setTheme = useCallback((next: Theme) => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const doc = document as Document & {
      startViewTransition?: (callback: () => void) => void;
    };

    if (doc.startViewTransition && !prefersReducedMotion) {
      doc.startViewTransition(() => {
        flushSync(() => setThemeState(next));
      });
    } else {
      setThemeState(next);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
