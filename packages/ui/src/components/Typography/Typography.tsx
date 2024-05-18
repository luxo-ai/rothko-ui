import React from 'react';
import { classes, scopedClasses as sc } from '@rothko-ui/utils';
import styles from './Typography.module.scss';
import type {
  TypographyProps,
  BaseParagraphProps,
  BaseHeadingProps,
  BaseLabelProps,
  BaseCodeProps,
} from './types';

const scopedClasses = sc(styles);

const body = ({
  italic,
  bold,
  light,
  kind,
  as,
  children,
  className,
  ...props
}: BaseParagraphProps & TypographyProps): JSX.Element => {
  const baseClasses = scopedClasses(
    'typography',
    'typography__paragraph',
    kind && `typography__paragraph--${kind}`,
    light && 'typography__paragraph--light',
    italic && 'typography__paragraph--italic',
    bold && 'typography__paragraph--bold'
  );
  return React.createElement(
    as || 'p',
    { ...props, className: classes(baseClasses, className) },
    children
  );
};

const bodySmall = ({
  italic,
  bold,
  light,
  kind,
  as,
  children,
  className,
  ...props
}: BaseParagraphProps & TypographyProps): JSX.Element => {
  const baseClasses = scopedClasses(
    'typography',
    'typography__paragraph',
    'typography__paragraph__small',
    kind && `typography__paragraph--${kind}`,
    light && 'typography__paragraph--light',
    italic && 'typography__paragraph--italic',
    bold && 'typography__paragraph--bold'
  );
  return React.createElement(
    as || 'p',
    { ...props, className: classes(baseClasses, className) },
    children
  );
};

const h1 = ({
  italic,
  bold,
  light,
  kind,
  as,
  children,
  className,
  ...props
}: BaseHeadingProps & TypographyProps): JSX.Element => {
  const baseClasses = scopedClasses(
    'typography',
    'typography__heading',
    'typography__heading__h1',
    kind && `typography__heading--${kind}`,
    light && 'typography__heading--light',
    italic && 'typography__heading--italic',
    bold && 'typography__heading--bold'
  );
  return React.createElement(
    as || 'h1',
    { ...props, className: classes(baseClasses, className) },
    children
  );
};

const h2 = ({
  italic,
  bold,
  light,
  kind,
  as,
  children,
  className,
  ...props
}: BaseHeadingProps & TypographyProps): JSX.Element => {
  const baseClasses = scopedClasses(
    'typography',
    'typography__heading',
    'typography__heading__h2',
    kind && `typography__heading--${kind}`,
    light && 'typography__heading--light',
    italic && 'typography__heading--italic',
    bold && 'typography__heading--bold'
  );
  return React.createElement(
    as || 'h2',
    { ...props, className: classes(baseClasses, className) },
    children
  );
};

const h3 = ({
  italic,
  bold,
  light,
  kind,
  as,
  children,
  className,
  ...props
}: BaseHeadingProps & TypographyProps): JSX.Element => {
  const baseClasses = scopedClasses(
    'typography',
    'typography__heading',
    'typography__heading__h3',
    kind && `typography__heading--${kind}`,
    light && 'typography__heading--light',
    italic && 'typography__heading--italic',
    bold && 'typography__heading--bold'
  );
  return React.createElement(
    as || 'h3',
    { ...props, className: classes(baseClasses, className) },
    children
  );
};

const h4 = ({
  italic,
  bold,
  light,
  kind,
  as,
  children,
  className,
  ...props
}: BaseHeadingProps & TypographyProps): JSX.Element => {
  const baseClasses = scopedClasses(
    'typography',
    'typography__heading',
    'typography__heading__h4',
    kind && `typography__heading--${kind}`,
    light && 'typography__heading--light',
    italic && 'typography__heading--italic',
    bold && 'typography__heading--bold'
  );
  return React.createElement(
    as || 'h4',
    { ...props, className: classes(baseClasses, className) },
    children
  );
};

const h5 = ({
  italic,
  bold,
  light,
  kind,
  as,
  children,
  className,
  ...props
}: BaseHeadingProps & TypographyProps): JSX.Element => {
  const baseClasses = scopedClasses(
    'typography',
    'typography__heading',
    'typography__heading__h5',
    kind && `typography__heading--${kind}`,
    light && 'typography__heading--light',
    italic && 'typography__heading--italic',
    bold && 'typography__heading--bold'
  );
  return React.createElement(
    as || 'h5',
    { ...props, className: classes(baseClasses, className) },
    children
  );
};

const h6 = ({
  italic,
  bold,
  light,
  kind,
  as,
  children,
  className,
  ...props
}: BaseHeadingProps & TypographyProps): JSX.Element => {
  const baseClasses = scopedClasses(
    'typography',
    'typography__heading',
    'typography__heading__h6',
    kind && `typography__heading--${kind}`,
    light && 'typography__heading--light',
    italic && 'typography__heading--italic',
    bold && 'typography__heading--bold'
  );
  return React.createElement(
    as || 'h6',
    { ...props, className: classes(baseClasses, className) },
    children
  );
};

const caption = ({
  italic,
  bold,
  light,
  kind,
  as,
  children,
  className,
  ...props
}: BaseParagraphProps & TypographyProps): JSX.Element => {
  const baseClasses = scopedClasses(
    'typography',
    'typography__paragraph',
    'typography__paragraph__caption',
    kind && `typography__paragraph--${kind}`,
    light && 'typography__paragraph--light',
    italic && 'typography__paragraph--italic',
    bold && 'typography__paragraph--bold'
  );
  return React.createElement(
    as || 'p',
    { ...props, className: classes(baseClasses, className) },
    children
  );
};

const label = ({
  italic,
  bold,
  light,
  kind,
  as,
  children,
  className,
  ...props
}: BaseLabelProps & TypographyProps): JSX.Element => {
  const baseClasses = scopedClasses(
    'typography',
    'typography__paragraph',
    'typography__paragraph__label',
    kind && `typography__paragraph--${kind}`,
    light && 'typography__paragraph--light',
    italic && 'typography__paragraph--italic',
    bold && 'typography__paragraph--bold'
  );
  return React.createElement(
    as || 'label',
    { ...props, className: classes(baseClasses, className) },
    children
  );
};

const code = ({
  italic,
  bold,
  light,
  kind,
  as,
  children,
  className,
  ...props
}: BaseCodeProps & TypographyProps): JSX.Element => {
  const baseClasses = scopedClasses(
    'typography',
    'typography__code',
    kind && `typography__paragraph--${kind}`,
    light && 'typography__code--light',
    italic && 'typography__code--italic',
    bold && 'typography__code--bold'
  );
  return React.createElement(
    as || 'code',
    { ...props, className: classes(baseClasses, className) },
    children
  );
};

export default {
  body,
  bodySmall,
  caption,
  code,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  label,
};
