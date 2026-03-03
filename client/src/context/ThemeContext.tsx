import {
  createContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import type { ThemeContextInterface } from "../types/types";
import { themes } from "../data";

export const ThemeContext = createContext<ThemeContextInterface | null>(null);

export const ThemeContextProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState<ThemeContextInterface["theme"]>(() => {
    return localStorage.getItem("Brainio_theme")
      ? themes.filter((t) => t.id === localStorage.getItem("Brainio_theme"))[0]
      : themes[0];
  });

  const applyTheme = (themeId: string) => {
    const theme = themes.filter((t) => t.id === themeId);
    if (theme.length === 1) {
      setTheme(theme[0]);
    } else {
      setTheme(themes[0]);
    }
  };

  useEffect(() => {
    localStorage.setItem("Brainio_theme", theme.id);
    document.documentElement.setAttribute("data-theme", theme.id);
    // Object.entries(theme.colors).forEach(([key, value]) => {
    //   document.documentElement.style.setProperty(`--color-${key}`, value);
    // });
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, applyTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
