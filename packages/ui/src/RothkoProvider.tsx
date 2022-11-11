import '@rothko-ui/tokens/build/index.css';
import React from 'react';
import type { ThemeContextProviderProps } from './Theme/ThemeContextV2';
import { ThemeContextProvider, useTheme } from './Theme/ThemeContextV2';

// Proxy for theme context provider + other context apis
export const RothkoProvider = ({ children, themeOverrides, mode }: ThemeContextProviderProps) => {
  return (
    <ThemeContextProvider themeOverrides={themeOverrides} mode={mode}>
      {children}
    </ThemeContextProvider>
  );
};

export const useRothko = useTheme;