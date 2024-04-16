// ~~ THEME ~~
const semanticNames = ['success', 'info', 'warning', 'danger'] as const;
const brandName = ['primary', 'secondary'] as const;

export const rothkoKinds = [...semanticNames, ...brandName] as const;
export type RothkoKind = (typeof rothkoKinds)[number];

export type ThemeMode = 'light' | 'dark';
export type RothkoSize = 'xs' | 's' | 'm' | 'l';

// ~~ COLORS ~~
export type HexColor = `#${string}`;
export type RGBColor = `rgba(${string})`;

export type Color = HexColor | RGBColor;
