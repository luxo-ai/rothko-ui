import type { RothkoKind, RothkoSize } from '@rothko-ui/system';

export type TypographyProps = {
  bold?: boolean;
  italic?: boolean;
  kind?: RothkoKind;
  light?: boolean;
  as?: keyof JSX.IntrinsicElements;
};

export type BaseParagraphProps = React.HTMLAttributes<HTMLParagraphElement> & {
  size?: RothkoSize;
};
export type BaseHeadingProps = React.HTMLAttributes<HTMLHeadingElement>;
export type BaseCodeProps = React.HTMLAttributes<HTMLElement>;
export type BaseLabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;
