import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps as NextThemeProviderProps } from "next-themes/dist/types";

export const NextThemeProvider = ({
  children,
  ...props
}: NextThemeProviderProps) => (
  <NextThemesProvider {...props}>{children}</NextThemesProvider>
);
