import type { DeepPartial } from '@rothko-ui/utils';

// ------------ COPIED FROM Theme/types.ts BEGIN

// ~~ THEME ~~
const semanticNames = ['success', 'info', 'warning', 'danger'] as const;
const baseNames = ['primary', 'secondary'] as const;

const rothkoKinds = [...semanticNames, ...baseNames] as const;
export type RothkoKind = (typeof rothkoKinds)[number];

export type ThemeMode = 'light' | 'dark';

export const ROTHKO_SIZE_XS = 'xs';
export const ROTHKO_SIZE_S = 's';
export const ROTHKO_SIZE_M = 'm';
export const ROTHKO_SIZE_L = 'l';
export const ROTHKO_SIZE_XL = 'xl';

export type RothkoSize =
  | typeof ROTHKO_SIZE_XS
  | typeof ROTHKO_SIZE_S
  | typeof ROTHKO_SIZE_M
  | typeof ROTHKO_SIZE_L
  | typeof ROTHKO_SIZE_XL;

const TYPOGRAPHY_BODY = 'body';
const TYPOGRAPHY_BODY_SMALL = 'bodySmall'; // body-sm
const TYPOGRAPHY_H1 = 'h1';
const TYPOGRAPHY_H2 = 'h2';
const TYPOGRAPHY_H3 = 'h3';
const TYPOGRAPHY_H4 = 'h4';
const TYPOGRAPHY_H5 = 'h5';
const TYPOGRAPHY_H6 = 'h6';
const TYPOGRAPHY_CAPTION = 'caption';
const TYPOGRAPHY_CODE = 'code';
const TYPOGRAPHY_LABEL = 'label';

export type TypographyType =
  | typeof TYPOGRAPHY_BODY
  | typeof TYPOGRAPHY_BODY_SMALL
  | typeof TYPOGRAPHY_H1
  | typeof TYPOGRAPHY_H2
  | typeof TYPOGRAPHY_H3
  | typeof TYPOGRAPHY_H4
  | typeof TYPOGRAPHY_H5
  | typeof TYPOGRAPHY_H6
  | typeof TYPOGRAPHY_CAPTION
  | typeof TYPOGRAPHY_CODE
  | typeof TYPOGRAPHY_LABEL;

// ~~ COLORS ~~
export type HexColor = `#${string}`;
export type RGBColor = `rgba(${string})`;

// ~~ SIZES ~~
export type EmSize = `${number}em`;
export type RemSize = `${number}rem`;
export type PercentSize = `${number}%`;
export type ViewportSize = `${number}vw` | `${number}vh`;
export type PixelSize = `${number}px`;

export type Color =
  | HexColor
  | RGBColor
  | 'transparent'
  | 'black'
  | 'white'
  | 'green'
  | 'red'
  | 'blue'
  | 'yellow'
  | 'purple'
  | 'pink'
  | 'orange'
  | 'gray'
  | 'indigo'
  | 'teal'
  | 'cyan';

// ------------ COPIED FROM Theme/types.ts END
// 🧑‍🍳 🇫🇷
export type ColourPalette = {
  100: Color;
  200: Color;
  300: Color;
  400: Color;
  500: Color;
  600: Color;
  700: Color;
  800: Color;
  900: Color;
  foreground: Color;
};

export type ThemeColors = DeepPartial<{
  [kind in RothkoKind | 'default']: ColourPalette;
}>;

export type FontConfig = DeepPartial<{
  bold: string;
  heading: string;
  italic: string;
  light: string;
  regular: string;
}>;

export type ComponentColors = DeepPartial<{
  typography: {
    link: Color;
    body: Color;
    heading: Color;
  };
  background: Color;
  border: Color;
  foreground: Color;
  icon: {
    background: Color;
    border: Color;
  };
  slider: {
    handle: {
      border: Color;
      background: Color;
    };
    range: {
      background: Color;
    };
    track: {
      background: Color;
    };
  };
  dropdown: {
    background: Color;
    multiselect: {
      foreground: Color;
      background: Color;
    };
    option: {
      'background::focus': Color;
    };
  };
  search: {
    background: Color;
    option: {
      'background::focus': Color;
    };
  };
  tabBar: {
    border: Color;
  };
  radio: {
    border: Color;
    background: Color;
    'background::focus': Color;
  };
  table: {
    header: {
      background: Color;
    };
    row: {
      border: Color;
    };
  };
  toast: {
    color: Color;
    background: Color;
    life: {
      filled: {
        background: Color;
      };
      empty: {
        background: Color;
      };
    };
  };
  box: {
    background: Color;
    border: Color;
  };
  accordion: {
    border: Color;
    background: Color;
  };
  checkbox: {
    background: Color;
    'background::focus': Color;
  };
  input: {
    background: Color;
    color: Color;
  };
  skeleton: {
    background: Color;
    foreground: Color;
  };
}>;

export type SizeConfig<Size extends RothkoSize> = {
  [key in Size]?: string;
};

export type BaseSizeConfig = SizeConfig<'xs' | 's' | 'm' | 'l'>;
export type FontSizeConfig = {
  [key in TypographyType]?: number | PixelSize | EmSize | RemSize;
};

export const spacingUnits = [
  ROTHKO_SIZE_XS,
  ROTHKO_SIZE_S,
  ROTHKO_SIZE_M,
  ROTHKO_SIZE_L,
  ROTHKO_SIZE_XL,
  `2${ROTHKO_SIZE_XL}`,
  `3${ROTHKO_SIZE_XL}`,
  `4${ROTHKO_SIZE_XL}`,
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '20',
  '24',
  '28',
  '32',
  '36',
  '40',
] as const;

export type SpacingUnit = (typeof spacingUnits)[number];

export type SpacingConfig = {
  [Key in SpacingUnit]?: string;
};

export type LayoutConfig = {
  /**
   * Base unit token that defines a consistent spacing scale across the components.
   *
   * @default 4 (px)
   */
  spacingUnit?: number;
  /**
   * The default font size applied across the components.
   *
   * @default
   * {
   *    tiny: "0.75rem",
   *    small: "0.875rem",
   *    medium: "1rem",
   *    large: "1.125rem",
   *    DEFAULT: "1rem",
   * }
   */
  fontSize?: FontSizeConfig;
  font?: FontConfig;
  /**
   * The default line height applied across the components.
   *
   * @default
   * {
   *    tiny: "1rem",
   *    small: "1.25rem",
   *    medium: "1.5rem",
   *    large: "1.75rem",
   *    DEFAULT: "1.5rem",
   * }
   */
  lineHeight?: FontSizeConfig;
  /**
   * The default radius applied across the components.
   * we recommend to use `rem` units.
   *
   * @default
   * {
   *   small: "0.25rem",
   *   medium: "0.5rem",
   *   large: "0.75rem",
   * }
   */
  radius?: BaseSizeConfig;
  /**
   * A number between 0 and 1 that is applied as opacity-[value] when the component is disabled.
   *
   * format: ".[value]"
   *
   * @default .5
   */
  disabledOpacity?: string | number;
  /**
   * A number between 0 and 1 that is applied as opacity-[value] when the component is hovered.
   *
   * format: ".[value]"
   *
   * @default .8
   */
  hoverOpacity?: string | number;
  /**
   * The default height applied to the divider component.
   * we recommend to use `px` units.
   *
   * @default 1px
   */
  dividerWeight?: string;
  /**
   * The border width applied across the components.
   * @default
   * {
   *    small: "1px",
   *    medium: "2px",
   *    large: "3px",
   * }
   *
   */
  borderWidth?: BaseSizeConfig;
};

export type ThemeConfig = {
  component?: ComponentColors;
  colors?: ThemeColors;
};

export type RothkoPluginConfig = {
  defaultTheme?: ThemeMode;
  // default "rothko-ui"
  variablePrefix?: string;
  // common layout across all themes
  layout?: LayoutConfig;
  // theme overrides
  themes?: {
    // cutom themes? if so add extends to config
    [Mode in ThemeMode]?: ThemeConfig;
  };
};
