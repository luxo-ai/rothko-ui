import '@rothko-ui/tokens/build/index.css';
import React from 'react';
import type { ThemeMode, ThemeOverrides } from './Theme';
import { ThemeContextProvider, useTheme } from './Theme';
import { PORTAL_ROOT_ID } from './Library/Portal';
// add "debugMode (on/off) to context"
// Proxy for theme context provider + other context apis

type RothkoProviderProps = {
  children: React.ReactNode;
  debugMode?: boolean;
  themeMode?: ThemeMode;
  themeOverrides?: ThemeOverrides;
};

export const RothkoProvider = ({
  children,
  debugMode,
  themeMode,
  themeOverrides,
}: RothkoProviderProps) => {
  return (
    <ThemeContextProvider themeOverrides={themeOverrides} mode={themeMode}>
      {children}
      <div id={PORTAL_ROOT_ID} />
    </ThemeContextProvider>
  );
};

export const useRothko = () => {
  const themeCtx = useTheme();
  return { ...themeCtx };
};
