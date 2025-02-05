import React from 'react';
import { classes, scopedClasses } from '@rothko-ui/system';
import styles from './Typography.module.scss';
import type {
  TypographyProps,
  BaseParagraphProps,
  BaseHeadingProps,
  BaseLabelProps,
  BaseCodeProps,
} from './types';

const sc = scopedClasses(styles);

export const Paragraph = ({
  italic,
  bold,
  light,
  kind,
  as,
  children,
  className,
  size,
  ...props
}: BaseParagraphProps & TypographyProps): JSX.Element => {
  const baseClasses = sc(
    'typography',
    'typography__paragraph',
    size && `typography__paragraph__${size}`,
    light && 'typography--light',
    italic && 'typography--italic',
    bold && 'typography--bold',
    kind && `typography--${kind}`
  );
  return React.createElement(
    as || 'p',
    { ...props, className: classes(baseClasses, className) },
    children
  );
};

type HeadingVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export const Heading = ({
  italic,
  bold,
  light,
  kind,
  as,
  children,
  className,
  variant,
  ...props
}: BaseHeadingProps & TypographyProps & { variant: HeadingVariant }): JSX.Element => {
  const baseClasses = sc(
    'typography',
    'typography__heading',
    `typography__heading__${variant}`,
    light && 'typography--light',
    italic && 'typography--italic',
    bold && 'typography--bold',
    kind && `typography--${kind}`
  );
  return React.createElement(
    as || variant,
    { ...props, className: classes(baseClasses, className) },
    children
  );
};

export const Heading1 = (props: BaseHeadingProps & TypographyProps): JSX.Element => (
  <Heading variant="h1" {...props} />
);

export const Heading2 = (props: BaseHeadingProps & TypographyProps): JSX.Element => (
  <Heading variant="h2" {...props} />
);

export const Heading3 = (props: BaseHeadingProps & TypographyProps): JSX.Element => (
  <Heading variant="h3" {...props} />
);

export const Heading4 = (props: BaseHeadingProps & TypographyProps): JSX.Element => (
  <Heading variant="h4" {...props} />
);

export const Heading5 = (props: BaseHeadingProps & TypographyProps): JSX.Element => (
  <Heading variant="h5" {...props} />
);

export const Heading6 = (props: BaseHeadingProps & TypographyProps): JSX.Element => (
  <Heading variant="h6" {...props} />
);

export const Label = ({
  italic,
  bold,
  light,
  kind,
  as,
  children,
  className,
  ...props
}: BaseLabelProps & TypographyProps): JSX.Element => {
  const baseClasses = sc(
    'typography',
    'typography__label',
    light && 'typography--light',
    italic && 'typography--italic',
    bold && 'typography--bold',
    kind && `typography--${kind}`
  );
  return React.createElement(
    as || 'label',
    { ...props, className: classes(baseClasses, className) },
    children
  );
};

export const Code = ({
  italic,
  bold,
  light,
  kind,
  as,
  children,
  className,
  ...props
}: BaseCodeProps & TypographyProps): JSX.Element => {
  const baseClasses = sc(
    'typography',
    'typography__code',
    light && 'typography--light',
    italic && 'typography--italic',
    bold && 'typography--bold',
    kind && `typography--${kind}`
  );
  return React.createElement(
    as || 'code',
    { ...props, className: classes(baseClasses, className) },
    children
  );
};
