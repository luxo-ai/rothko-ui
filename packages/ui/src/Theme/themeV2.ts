import type { FlattenSimpleInterpolation } from 'styled-components';
import { css } from 'styled-components';
import type { RothkoKind } from './types';

export type HexColor = `#${string}`;
export type RGBColor = `rgba(${string})`;

type Lightness = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
type TransparentLightness = `transparent-${Exclude<Lightness, 700 | 800 | 900>}`;

type LightnessKey = Lightness | TransparentLightness;

type State = 'focus' | 'hover' | 'active' | 'disabled' | 'transparent';
type Colorable = 'text' | 'bg' | 'border';

export type Color = HexColor | RGBColor;
export type ColorableKey = Extract<Colorable, 'text'> | `${Exclude<Colorable, 'text'>}-${State}`;

export type LightnessMap = {
  readonly [key in Exclude<ColorableKey, 'text'>]: LightnessKey;
};

export const lightnessMap: LightnessMap = {
  'bg-active': 600,
  'bg-focus': 600,
  'bg-disabled': 'transparent-500',
  'bg-transparent': 'transparent-300',
  'bg-hover': 600,
  'border-active': 500,
  'border-focus': 500,
  'border-transparent': 'transparent-300',
  'border-disabled': 'transparent-500',
  'border-hover': 500,
};

const idk: Record<Exclude<ColorableKey, 'text'>, string | number> = {
  'bg-active': 400,
  'bg-focus': 600,
  'bg-disabled': 'transparent-600',
  'bg-transparent': 'transparent-300',
  'bg-hover': 400,
  'border-active': 500,
  'border-focus': 500,
  'border-transparent': 'transparent-300',
  'border-disabled': 'transparent-500',
  'border-hover': 300,
};

type Opts = {
  default?: HexColor | RGBColor;
};

export const idkFn = (kind: RothkoKind, ok?: ColorableKey, opts?: Opts) => {
  const generateVarWithDefault = (k: RothkoKind, num = 500) => {
    if (opts?.default) {
      return `var(--${k}-${num}, ${opts.default})`;
    }
    return `var(--${k}-${num})`;
  };

  if (!ok) {
    return kind === 'info'
      ? generateVarWithDefault('secondary', 400)
      : generateVarWithDefault(kind, 500);
  }
  if (ok === 'text') {
    if (kind === 'primary') return '#fff';
    return 'black';
  }
  return `var(--${kind}-${idk[ok]})`;
};

const kindToStyle: Record<RothkoKind, FlattenSimpleInterpolation> = {
  primary: css`
    color: white;
  `,
  secondary: css`
    color: white;
  `,
  success: css`
    color: black;
  `,
  info: css`
    color: white;
  `,
  warning: css`
    color: black;
  `,
  danger: css`
    color: white;
  `,
  basic: css`
    color: black;
  `,
};

type StyleProps = {
  kind: RothkoKind;
};

export default css<StyleProps>`
  color: black;
  ${({ kind }) => kindToStyle[kind]}
`;
