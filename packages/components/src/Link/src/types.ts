export type LinkUnderlineVariant = 'none' | 'hover' | 'always';

export type LinkProps = {
  disabled?: boolean;
  underlineVariant?: LinkUnderlineVariant;
  size?: 's' | 'm';
  as?: keyof JSX.IntrinsicElements;
};
