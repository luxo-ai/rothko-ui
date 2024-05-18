import type { RothkoKind } from '../../theme';

export type TypographyProps = {
  bold?: boolean;
  italic?: boolean;
  kind?: RothkoKind;
  light?: boolean;
  as?: keyof JSX.IntrinsicElements;
};

export type BaseParagraphProps = React.HTMLAttributes<HTMLParagraphElement>;
export type BaseHeadingProps = React.HTMLAttributes<HTMLHeadingElement>;
export type BaseCodeProps = React.HTMLAttributes<HTMLElement>;
export type BaseLabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;
