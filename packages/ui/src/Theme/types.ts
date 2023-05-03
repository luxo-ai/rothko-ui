// ~~ THEME ~~
const semanticNames = ['success', 'info', 'warning', 'danger', 'basic'] as const;
const brandName = ['primary', 'secondary'] as const;

export const rothkoKinds = [...semanticNames, ...brandName] as const;
export type RothkoKind = typeof rothkoKinds[number];

export type KindProps = {
  kind?: RothkoKind;
};

export type ThemeMode = 'light' | 'dark';
export type RothkoSize = 'xs' | 's' | 'm' | 'l' | 'xl';

// ~~ COLORS ~~
export type HexColor = `#${string}`;
export type RGBColor = `rgba(${string})`;

export type Color = HexColor | RGBColor;
