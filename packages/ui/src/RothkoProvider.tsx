import '@rothko-ui/tokens/build/index.css';
import React from 'react';
import type { ThemeContextProviderProps } from './Theme/ThemeContextV2';
import { ThemeContextProvider, useThemeV2 } from './Theme/ThemeContextV2';
// add "debugMode (on/off) to context"
// Proxy for theme context provider + other context apis
export const RothkoProvider = ({ children, themeOverrides, mode }: ThemeContextProviderProps) => {
  return (
    <ThemeContextProvider themeOverrides={themeOverrides} mode={mode}>
      {children}
    </ThemeContextProvider>
  );
};

export const useRothko = useThemeV2;
