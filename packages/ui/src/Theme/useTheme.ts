import React, { useContext } from 'react';
import { baseOverrides, lightnessMap, theme } from './theme';
import {
  AemikoKind,
  Color,
  ColorableKey,
  greyScale,
  isGreyScale,
  GreyScale,
  Theme,
  greyScaleInverse,
} from './types';
import ThemeContext from './ThemeContextV2';

type Mode = 'dark' | 'light';



type Colorer = (c?: ColorableKey) => Color;
export type CanColor = { themeColorer: Colorer };

export const useKindTheme = (kind: AemikoKind | GreyScale) => {
  const { theme } = useTheme();

  const colorWithKind: Colorer = c => {
    if (isGreyScale(kind)) {
      return c === 'text' ? greyScale[greyScaleInverse[kind]] : greyScale[kind];
    }
    if (!c) return kind === 'info' ? theme[`secondary-400`] : theme[`${kind}-500`];
    const override = baseOverrides[kind][c];
    if (override) return override;
    if (c === 'text') return greyScale.black;
    const lightness = lightnessMap[c];
    return theme[`${kind}-${lightness}`];
  };

  return [colorWithKind, theme] as const;
};

type ThemeContext = {
  theme: Theme;
  mode: Mode;
};

const Context = React.createContext<ThemeContext | null>(null);
