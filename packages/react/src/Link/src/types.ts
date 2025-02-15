import type { RothkoSize } from '@rothko-ui/system';

export type LinkUnderlineVariant = 'none' | 'hover' | 'always';

export type LinkProps = {
  disabled?: boolean;
  underlineVariant?: LinkUnderlineVariant;
  size?: RothkoSize;
  as?: keyof JSX.IntrinsicElements;
};
