import { pathToCssVariable } from '@rothko-ui/tokens';
import type { DeepPartial, NestedRecord } from '@rothko-ui/utils';
import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { RothkoKind, ThemeMode } from './types';

const TERMINAL_KEY = 'value' as const;

export type ThemeOverrides = DeepPartial<{
  color: {
    [kind in RothkoKind]: {
      100: { [TERMINAL_KEY]: string };
      200: { [TERMINAL_KEY]: string };
      300: { [TERMINAL_KEY]: string };
      400: { [TERMINAL_KEY]: string };
      500: { [TERMINAL_KEY]: string };
      600: { [TERMINAL_KEY]: string };
      700: { [TERMINAL_KEY]: string };
      800: { [TERMINAL_KEY]: string };
      900: { [TERMINAL_KEY]: string };
      transparent: {
        100: { [TERMINAL_KEY]: string };
        200: { [TERMINAL_KEY]: string };
        300: { [TERMINAL_KEY]: string };
        400: { [TERMINAL_KEY]: string };
        500: { [TERMINAL_KEY]: string };
        600: { [TERMINAL_KEY]: string };
      };
    };
  };
}>;

const createThemeOverrideStyle = (overrides: ThemeOverrides) => {
  const { color } = overrides;
  if (!color) return;

  const recursiveCollect = (
    acc: Record<string, string>[],
    currPath: string[],
    obj: NestedRecord
  ): Record<string, string>[] => {
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'string') {
        if (key !== TERMINAL_KEY) {
          throw Error('Poorly structured override');
        }
        return [...acc, { [pathToCssVariable(currPath)]: value }];
      } else {
        acc = recursiveCollect(acc, [...currPath, key], value);
      }
    }
    return acc;
  };

  return recursiveCollect([], [], color as NestedRecord);
};

type IThemeContext = {
  mode: ThemeMode;
  toggleMode: () => void;
};

const Context = createContext<IThemeContext | null>(null);

type ThemeContextProviderProps = {
  children?: React.ReactNode;
  mode?: ThemeMode;
  themeOverrides?: ThemeOverrides;
};

export const ThemeContextProvider = ({
  children,
  mode: initialMode = 'light',
  themeOverrides = {},
}: ThemeContextProviderProps) => {
  const [mode, setMode] = useState<ThemeMode>(initialMode);

  const toggleMode = useCallback(() => {
    setMode(currMode => (currMode == 'light' ? 'dark' : 'light'));
  }, [setMode]);

  const inlineOverrides = useMemo(() => createThemeOverrideStyle(themeOverrides), [themeOverrides]);

  return (
    <Context.Provider value={{ mode, toggleMode }}>
      <div
        id="theme-root"
        className={mode}
        style={inlineOverrides?.reduce((acc, curr) => ({ ...acc, ...curr }))}
      >
        {children}
      </div>
    </Context.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(Context);
  if (!ctx) {
    throw Error('useTheme must be used within a ThemeContextProvider');
  }
  return ctx;
};
