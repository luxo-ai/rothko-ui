export type UnderlineVariant = 'none' | 'hover' | 'always';

export type LinkProps = {
  disabled?: boolean;
  underline?: UnderlineVariant;
  small?: boolean;
  as?: keyof JSX.IntrinsicElements;
};
