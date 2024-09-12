/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useTheme as useThemeInner } from 'next-themes';
import { useCallback } from 'react';

const useTheme = () => {
  const { theme, setTheme } = useThemeInner();
  const toggleTheme = useCallback(() => {
    setTheme(t => (t === 'dark' ? 'light' : 'dark'));
  }, [setTheme]);
  return { theme, toggleTheme };
};

const useThemeTemp = () => {
  return { theme: 'dark', toggleTheme: () => {} };
};

export default useThemeTemp;
