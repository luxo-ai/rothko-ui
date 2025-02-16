/* eslint-disable react/jsx-props-no-spreading */
import type { RothkoKind, RothkoSize } from '@rothko-ui/system';
import { classes } from '@rothko-ui/system';
import React from 'react';

interface ParagrpahProps extends React.HTMLAttributes<HTMLParagraphElement> {
  as?: keyof JSX.IntrinsicElements;
  kind?: RothkoKind;
  size?: RothkoSize;
  variant?: 'bold' | 'italic' | 'light' | 'regular';
}

export const Paragraph = ({
  as,
  children,
  className,
  kind,
  size = 'm',
  style = {},
  variant = 'regular',
  ...props
}: ParagrpahProps): JSX.Element => {
  const colorVarStyle = {
    '--paragraph-color': kind ? `var(--rothko-${kind})` : 'var(--rothko-typography-body-color)',
  } as React.CSSProperties;

  const paragraphClasses = classes(
    'my-[0.125rem] mx-0',
    variant === 'italic' && 'rothko-font-italic',
    variant === 'bold' && 'rothko-font-bold',
    variant === 'light' && 'rothko-font-light',
    variant === 'regular' && 'rothko-font-regular',
    size === 'xs' && 'rothko-paragraph-size-xs',
    size === 's' && 'rothko-paragraph-size-s',
    size === 'm' && 'rothko-paragraph-size-m',
    size === 'l' && 'rothko-paragraph-size-l',
    'text-(--paragraph-color)',
    className
  );

  return React.createElement(
    as || 'p',
    {
      ...props,
      className: paragraphClasses,
      style: { ...style, ...colorVarStyle },
    },
    children
  );
};

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: keyof JSX.IntrinsicElements;
  kind?: RothkoKind;
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const Heading = ({
  as,
  children,
  className,
  kind,
  style = {},
  variant,
  ...props
}: HeadingProps): JSX.Element => {
  const colorVarStyle = {
    '--heading-color': kind ? `var(--rothko-${kind})` : 'var(--rothko-typography-heading-color)',
  } as React.CSSProperties;

  const headingClasses = classes(
    'my-[0.125rem] mx-0',
    'rothko-font-heading',
    variant === 'h1' && 'rothko-heading-size-h1',
    variant === 'h2' && 'rothko-heading-size-h2',
    variant === 'h3' && 'rothko-heading-size-h3',
    variant === 'h4' && 'rothko-heading-size-h4',
    variant === 'h5' && 'rothko-heading-size-h5',
    variant === 'h6' && 'rothko-heading-size-h6',
    'text-(--heading-color)',
    className
  );

  return React.createElement(
    as || variant,
    {
      ...props,
      className: headingClasses,
      style: { ...style, ...colorVarStyle },
    },
    children
  );
};

export const Heading1 = (props: Omit<HeadingProps, 'variant'>): JSX.Element => (
  <Heading variant="h1" {...props} />
);

export const Heading2 = (props: Omit<HeadingProps, 'variant'>): JSX.Element => (
  <Heading variant="h2" {...props} />
);

export const Heading3 = (props: Omit<HeadingProps, 'variant'>): JSX.Element => (
  <Heading variant="h3" {...props} />
);

export const Heading4 = (props: Omit<HeadingProps, 'variant'>): JSX.Element => (
  <Heading variant="h4" {...props} />
);

export const Heading5 = (props: Omit<HeadingProps, 'variant'>): JSX.Element => (
  <Heading variant="h5" {...props} />
);

export const Heading6 = (props: Omit<HeadingProps, 'variant'>): JSX.Element => (
  <Heading variant="h6" {...props} />
);

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  as?: keyof JSX.IntrinsicElements;
  kind?: RothkoKind;
}

export const Label = ({
  as,
  children,
  className,
  kind,
  style = {},
  ...props
}: LabelProps): JSX.Element => {
  const colorVarStyle = {
    '--label-color': kind ? `var(--rothko-${kind})` : 'var(--rothko-typography-body-color)',
  } as React.CSSProperties;

  const labelClasses = classes(
    'my-[0.125rem] mx-0',
    'rothko-font-regular',
    'rothko-paragraph-size-xs',
    'text-(--label-color)',
    'uppercase',
    'tracking-[0.0625rem]', // letter-spacing: 0.0625rem;
    className
  );

  return React.createElement(
    as || 'label',
    {
      ...props,
      className: labelClasses,
      style: { ...style, ...colorVarStyle },
    },
    children
  );
};

interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  as?: keyof JSX.IntrinsicElements;
}

export const Code = ({ as, children, className, ...props }: CodeProps): JSX.Element => {
  const codeClasses = classes(
    'my-[0.125rem] mx-0',
    'rothko-font-code',
    'rothko-color-code',
    'rothko-code-size',
    'whitespace-pre-wrap',
    'px-[0.25rem]', //
    'py-[0.125rem]', //
    'bg-[rgba(153,_161,_179,_0.1)]',
    'rounded-[0.375rem]',
    className
  );
  return React.createElement(as || 'code', { ...props, className: codeClasses }, children);
};
