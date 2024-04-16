import type { TypographyProps } from '../Typography/types';

export type UnderlineVariant = 'none' | 'hover' | 'always';

export type LinkProps = TypographyProps & {
  underline?: UnderlineVariant;
};
