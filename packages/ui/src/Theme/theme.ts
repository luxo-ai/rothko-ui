import type { FlattenSimpleInterpolation } from 'styled-components';
import { css } from 'styled-components';
import type { RothkoKind, HexColor, RGBColor } from './types';

type State = 'focus' | 'hover' | 'active' | 'disabled' | 'transparent';
type Colorable = 'text' | 'bg' | 'border';

export type ColorableKey = Extract<Colorable, 'text'> | `${Exclude<Colorable, 'text'>}-${State}`;

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

export const idkFn = (
  kind: RothkoKind,
  ok?: ColorableKey,
  opts?: { default: HexColor | RGBColor }
) => {
  const generateVarWithDefault = (k: RothkoKind, num = 500) => {
    if (opts?.default) {
      return `var(--rothko-${k}-${num}, ${opts.default})`;
    }
    return `var(--rothko-${k}-${num})`;
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
  return `var(--rothko-${kind}-${idk[ok]})`;
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

export default css<{ kind: RothkoKind }>`
  color: black;
  ${({ kind }) => kindToStyle[kind]}
`;
