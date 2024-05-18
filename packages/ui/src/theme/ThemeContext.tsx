import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import type { ThemeMode } from './types';

// compantibility with SSR
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

type IThemeContext = {
  mode: ThemeMode;
  toggleMode: () => void;
};

const Context = createContext<IThemeContext | null>(null);

type ThemeContextProviderProps = {
  children?: React.ReactNode;
  mode?: ThemeMode;
};

export const ThemeContextProvider = ({
  children,
  mode: initialMode = 'light',
}: ThemeContextProviderProps) => {
  const [mode, setMode] = useState<ThemeMode>(initialMode);

  const toggleMode = useCallback(() => {
    setMode(currMode => (currMode == 'light' ? 'dark' : 'light'));
  }, [setMode]);

  // background hack
  useIsomorphicLayoutEffect(() => {
    const body = document.body;
    if (body) {
      body.classList.remove('light', 'dark');
      body.classList.add(mode);
    }
  }, [mode]);

  return <Context.Provider value={{ mode, toggleMode }}>{children}</Context.Provider>;
};

export const useTheme = () => {
  const ctx = useContext(Context);
  if (!ctx) {
    throw Error('useTheme must be used within a ThemeContextProvider');
  }
  return ctx;
};
