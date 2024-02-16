import type { DeepPartial } from '@rothko-ui/utils';

// ~~ THEME ~~
const semanticNames = ['success', 'info', 'warning', 'danger'] as const;
const brandName = ['primary', 'secondary'] as const;

export const rothkoKinds = [...semanticNames, ...brandName] as const;
export type RothkoKind = (typeof rothkoKinds)[number];

export type KindProps = {
  kind?: RothkoKind;
};

export type ThemeMode = 'light' | 'dark';
export type RothkoSize = 'xs' | 's' | 'm' | 'l' | 'xl';

// ~~ COLORS ~~
export type HexColor = `#${string}`;
export type RGBColor = `rgba(${string})`;

export type Color = HexColor | RGBColor;

// ~~ THEME OVERRIDES ~~
export const TERMINAL_KEY = 'value' as const;

type SemanticColorOverrides = DeepPartial<{
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
  };
}>;

type TypographyOverrides = DeepPartial<{
  typography: {
    body: {
      bold: { [TERMINAL_KEY]: string };
      italic: { [TERMINAL_KEY]: string };
      light: { [TERMINAL_KEY]: string };
      regular: { [TERMINAL_KEY]: string };
    };
    header: { [TERMINAL_KEY]: string };
  };
}>;

type ComponentOverrides = DeepPartial<{
  background: { [TERMINAL_KEY]: string };
  border: { [TERMINAL_KEY]: string };
  color: { [TERMINAL_KEY]: string };
  svg: {
    fill: { [TERMINAL_KEY]: string };
    stroke: { [TERMINAL_KEY]: string };
  };

  link: { [TERMINAL_KEY]: string };
  slider: {
    handle: {
      border: { [TERMINAL_KEY]: string };
      background: { [TERMINAL_KEY]: string };
    };
    range: {
      background: { [TERMINAL_KEY]: string };
    };
    track: {
      background: { [TERMINAL_KEY]: string };
    };
  };
  dropdown: {
    background: { [TERMINAL_KEY]: string };
    border_minimal: { [TERMINAL_KEY]: string };
    multiselect: {
      text: { [TERMINAL_KEY]: string };
      background: { [TERMINAL_KEY]: string };
    };
    option: {
      background_selected: { [TERMINAL_KEY]: string };
    };
  };
  search: {
    background: { [TERMINAL_KEY]: string };
    option: {
      background_selected: { [TERMINAL_KEY]: string };
    };
  };
  tabBar: {
    border: { [TERMINAL_KEY]: string };
  };
  radio: {
    border: { [TERMINAL_KEY]: string };
    background: { [TERMINAL_KEY]: string };
    background_selected: { [TERMINAL_KEY]: string };
  };
  table: {
    header: {
      background: { [TERMINAL_KEY]: string };
    };
    row: {
      border: { [TERMINAL_KEY]: string };
    };
  };
  toast: {
    color: { [TERMINAL_KEY]: string };
    background: { [TERMINAL_KEY]: string };
    life: {
      filled: { [TERMINAL_KEY]: string };
      empty: { [TERMINAL_KEY]: string };
    };
  };
  box: {
    background: { [TERMINAL_KEY]: string };
    border: { [TERMINAL_KEY]: string };
  };
  accordion: {
    border: { [TERMINAL_KEY]: string };
    background: { [TERMINAL_KEY]: string };
  };
  checkbox: {
    background: { [TERMINAL_KEY]: string };
    background_selected: { [TERMINAL_KEY]: string };
  };
  input: {
    background: { [TERMINAL_KEY]: string };
    color: { [TERMINAL_KEY]: string };
  };
  skeleton: {
    background: { [TERMINAL_KEY]: string };
    foreground: { [TERMINAL_KEY]: string };
  };
}>;

export type ThemeOverrides = TypographyOverrides &
  Partial<{
    [mode in ThemeMode]: SemanticColorOverrides & ComponentOverrides;
  }>;
