type Lightness = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
type TransparentLightness = `transparent-${Exclude<Lightness, 700 | 800 | 900>}`;

type SemanticName = 'success' | 'info' | 'warning' | 'danger' | 'basic';
type BrandName = 'primary' | 'secondary';

export type KindProps = {
  kind?: RothkoKind;
};

type ColorName = SemanticName | BrandName;
type LightnessKey = Lightness | TransparentLightness;
type ThemeKey = `${ColorName}-${LightnessKey}`;

type State = 'focus' | 'hover' | 'active' | 'disabled' | 'transparent';
type Colorable = 'text' | 'bg' | 'border';

export type HexColor = `#${string}`;
export type RGBColor = `rgba(${string})`;

export const greyScale = {
  black: '#000000',
  white: '#FFFFFF',
} as const;

export const greyScaleInverse = {
  black: 'white',
  white: 'black',
} as const;

export type GreyScale = keyof typeof greyScale;

export const isGreyScale = (v: string): v is GreyScale => {
  return v in greyScale;
};

export type Color = HexColor | RGBColor;
export type ColorableKey = Extract<Colorable, 'text'> | `${Exclude<Colorable, 'text'>}:${State}`;

export type ColorOverrideMap = {
  readonly [key in ColorName]: {
    readonly [key in ColorableKey]?: Color;
  } & {
    readonly [key in Extract<ColorableKey, 'text'>]: Color;
  };
};

export type LightnessMap = {
  readonly [key in Exclude<ColorableKey, 'text'>]: LightnessKey;
};

export type Theme = { readonly [key in ThemeKey]: Color };
export type RothkoKind = ColorName;
export type RothkoSize = 'xs' | 's' | 'm' | 'l' | 'xl';
export type ThemedElement = { aemikoTheme: Theme };
