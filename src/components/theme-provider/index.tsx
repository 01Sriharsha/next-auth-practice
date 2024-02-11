"use client";

import { ReactNode, useEffect, useState } from "react";

import { NextThemeProvider } from "./next-theme-provider";
import { ToggleTheme } from "./toggle-theme";

type ThemeProviderProps = {
  children: ReactNode;
};

export type Theme = "dark" | "light" | "system";

const setLocalTheme = (value: string) => localStorage.setItem("__theme", value);

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>("system");

  useEffect(() => {
    const localTheme = localStorage.getItem("__theme") as Theme;
    if (localTheme === "light") {
      setTheme("light");
    } else if (localTheme === "dark") {
      setTheme("dark");
    } else if (localTheme === "system") {
      setTheme("system");
    }
  }, []);

  const updateTheme = (value: Theme) => {
    setTheme(value);
    setLocalTheme(value);
  };

  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme={"system"}
      forcedTheme={theme}
      enableSystem
      disableTransitionOnChange
    >
      <div className="dark:bg-gray-950 h-full relative">
        {children}
        <div className="absolute right-2 bottom-1">
          <ToggleTheme updateTheme={updateTheme} />
        </div>
      </div>
    </NextThemeProvider>
  );
}