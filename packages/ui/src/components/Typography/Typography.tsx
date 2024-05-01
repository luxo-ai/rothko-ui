import React from 'react';
import type { RothkoKind } from '../../theme';
import { classes, compact } from '@rothko-ui/utils';
import styles from './Typography.module.scss';

export type TypographyProps2 = {
  bold?: boolean;
  italic?: boolean;
  kind?: RothkoKind;
  light?: boolean;
  as?: keyof JSX.IntrinsicElements;
};

// CLASS NAMES

const body = ({
  italic,
  bold,
  light,
  kind,
  as,
  children,
  className,
  ...props
}: JSX.IntrinsicElements['p'] & TypographyProps2) => {
  const classNames = classes(
    styles[compact(['body', kind]).join('-')],
    light && styles['text-light'],
    italic && styles['text-italic'],
    bold && styles['text-bold'],
    className
  );
  return React.createElement(as || 'p', { ...props, className: classNames }, children);
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
}: JSX.IntrinsicElements['p'] & TypographyProps2) => {
  const classNames = classes(
    styles[compact(['body-small', kind]).join('-')],
    light && styles['text-light'],
    italic && styles['text-italic'],
    bold && styles['text-bold'],
    className
  );
  return React.createElement(as || 'p', { ...props, className: classNames }, children);
};

const h1 = ({
  italic,
  bold,
  light,
  kind,
  as,
  children,
  ...props
}: JSX.IntrinsicElements['h1'] & TypographyProps2) => {
  const classNames = classes(
    styles[compact(['h1', kind]).join('-')],
    light && styles['text-light'],
    italic && styles['text-italic'],
    bold && styles['text-bold']
  );
  return React.createElement(as || 'h1', { ...props, className: classNames }, children);
};

const h2 = ({
  italic,
  bold,
  light,
  kind,
  as,
  children,
  ...props
}: JSX.IntrinsicElements['h2'] & TypographyProps2) => {
  const classNames = classes(
    styles[compact(['h2', kind]).join('-')],
    light && styles['text-light'],
    italic && styles['text-italic'],
    bold && styles['text-bold']
  );
  return React.createElement(as || 'h2', { ...props, className: classNames }, children);
};

const h3 = ({
  italic,
  bold,
  light,
  kind,
  as,
  children,
  ...props
}: JSX.IntrinsicElements['h3'] & TypographyProps2) => {
  const classNames = classes(
    styles[compact(['h3', kind]).join('-')],
    light && styles['text-light'],
    italic && styles['text-italic'],
    bold && styles['text-bold']
  );
  return React.createElement(as || 'h3', { ...props, className: classNames }, children);
};

const h4 = ({
  italic,
  bold,
  light,
  kind,
  as,
  children,
  ...props
}: JSX.IntrinsicElements['h4'] & TypographyProps2) => {
  const classNames = classes(
    styles[compact(['h4', kind]).join('-')],
    light && styles['text-light'],
    italic && styles['text-italic'],
    bold && styles['text-bold']
  );
  return React.createElement(as || 'h4', { ...props, className: classNames }, children);
};

const h5 = ({
  italic,
  bold,
  light,
  kind,
  as,
  children,
  ...props
}: JSX.IntrinsicElements['h5'] & TypographyProps2) => {
  const classNames = classes(
    styles[compact(['h5', kind]).join('-')],
    light && styles['text-light'],
    italic && styles['text-italic'],
    bold && styles['text-bold']
  );
  return React.createElement(as || 'h5', { ...props, className: classNames }, children);
};

const h6 = ({
  italic,
  bold,
  light,
  kind,
  as,
  children,
  ...props
}: JSX.IntrinsicElements['h6'] & TypographyProps2) => {
  const classNames = classes(
    styles[compact(['h6', kind]).join('-')],
    light && styles['text-light'],
    italic && styles['text-italic'],
    bold && styles['text-bold']
  );
  return React.createElement(as || 'h6', { ...props, className: classNames }, children);
};

const caption = ({
  italic,
  bold,
  light,
  kind,
  as,
  children,
  ...props
}: JSX.IntrinsicElements['p'] & TypographyProps2) => {
  const classNames = classes(
    styles[compact(['caption', kind]).join('-')],
    light && styles['text-light'],
    italic && styles['text-italic'],
    bold && styles['text-bold']
  );
  return React.createElement(as || 'p', { ...props, className: classNames }, children);
};

const label = ({
  italic,
  bold,
  light,
  kind,
  as,
  children,
  ...props
}: JSX.IntrinsicElements['label'] & TypographyProps2) => {
  const classNames = classes(
    styles[compact(['label', kind]).join('-')],
    light && styles['text-light'],
    italic && styles['text-italic'],
    bold && styles['text-bold']
  );
  return React.createElement(as || 'label', { ...props, className: classNames }, children);
};

const code = ({
  italic,
  bold,
  light,
  kind,
  as,
  children,
  ...props
}: JSX.IntrinsicElements['code'] & TypographyProps2) => {
  const classNames = classes(
    styles[compact(['code', kind]).join('-')],
    light && styles['text-light'],
    italic && styles['text-italic'],
    bold && styles['text-bold']
  );
  return React.createElement(as || 'code', { ...props, className: classNames }, children);
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
