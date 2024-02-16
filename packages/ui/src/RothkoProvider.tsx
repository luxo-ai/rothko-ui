import '@rothko-ui/tokens/web/dark.css';
import '@rothko-ui/tokens/web/global.css';
import '@rothko-ui/tokens/web/light.css';

import React from 'react';
import { DebuggerContextProvider } from './Libraryy/DebuggerContext';
import { PORTAL_ROOT_ID } from './Libraryy/Portal';
import type { ThemeMode, ThemeOverrides } from './Theme';
import { ThemeContextProvider, useTheme } from './Theme';

type RothkoProviderProps = {
  children: React.ReactNode;
  debugMode?: boolean;
  themeMode?: ThemeMode;
  themeOverrides?: ThemeOverrides;
};

// proxy provider for theme and debugger contexts
export const RothkoProvider = ({
  children,
  debugMode,
  themeMode,
  themeOverrides,
}: RothkoProviderProps) => (
  <ThemeContextProvider themeOverrides={themeOverrides} mode={themeMode}>
    <DebuggerContextProvider debug={debugMode}>
      {children}
      <div id={PORTAL_ROOT_ID} />
    </DebuggerContextProvider>
  </ThemeContextProvider>
);

export const useRothko = () => {
  const themeCtx = useTheme();
  return { ...themeCtx };
};
