/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { ThemeProvider as ThemeProviderInner } from 'next-themes';

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme: string;
};

/*
const ThemeProvider = ({ children, defaultTheme }: ThemeProviderProps) => {
  return (
    <ThemeProviderInner themes={['dark', 'light']} defaultTheme={defaultTheme}>
      {children}
    </ThemeProviderInner>
  );
};
*/

const ThemeProviderTemp = ({ children, defaultTheme: _d }: ThemeProviderProps) => {
  return <>{children}</>;
};

export default ThemeProviderTemp;
