import type { NestedRecord, Nullable } from 'utils';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import type { ThemeMode, ThemeOverrides } from './types';
import { TERMINAL_KEY } from './types';

// compantibility with SSR
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

// TEMPORARY HACK
const CSS_VARIABLE_PREFIX = 'rothko';
const pathToCssVariable = (path: string[], prefix: string = CSS_VARIABLE_PREFIX) => {
  return `--${(prefix ? [prefix, ...path] : path).join('-')}`;
};
// END TEMPORARY HACKs

const createThemeOverrideStyle = (overrides: Nullable<ThemeOverrides[ThemeMode]>) => {
  if (!overrides) return overrides;

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
        return [...acc, { [pathToCssVariable(currPath, 'rothko')]: value }];
      } else {
        acc = recursiveCollect(acc, [...currPath, key], value);
      }
    }
    return acc;
  };

  return recursiveCollect([], [], overrides as NestedRecord);
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

  const inlineOverrides = useMemo(() => {
    const { light, dark, ...rest } = themeOverrides;
    return createThemeOverrideStyle({ ...((mode === 'light' ? light : dark) || {}), ...rest });
  }, [themeOverrides, mode]);

  // background hack
  useIsomorphicLayoutEffect(() => {
    const body = document.body;
    if (body) {
      body.classList.remove('light', 'dark');
      body.classList.add(mode);
    }
  }, [mode]);

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
