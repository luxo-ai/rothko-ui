import { classes } from '@helpers';
import React from 'react';

import styles from './Container.module.scss';

export type ContainerProps = {
  as?: keyof JSX.IntrinsicElements;
  // Margin
  margin?: string | number;
  marginLeft?: string | number;
  marginRight?: string | number;
  marginTop?: string | number;
  marginBottom?: string | number;

  // Padding
  padding?: string | number;
  paddingLeft?: string | number;
  paddingRight?: string | number;
  paddingTop?: string | number;
  paddingBottom?: string | number;

  // Width & Height
  width?: string | number;
  height?: string | number;

  // Max Width & Max Height
  maxWidth?: string | number;
  maxHeight?: string | number;

  // Border
  border?: string;
  borderTop?: string;
  borderBottom?: string;
  borderLeft?: string;
  borderRight?: string;
  borderRadius?: string | number;

  // Background
  background?: string;
  backgroundColor?: string;

  // Additional Styles
  display?: 'block' | 'inline-block' | 'inline' | 'flex' | 'grid' | 'none';
  position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
  zIndex?: number;
  overflow?: 'visible' | 'hidden' | 'scroll' | 'auto';
  boxShadow?: string;
  opacity?: number;
  flexShrink?: number;
  flexGrow?: number;
  flexBasis?: string | number;
  flex?: string | number;

  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
};

export const Container = ({
  as = 'div',
  children,
  className,
  margin,
  marginLeft,
  marginRight,
  marginTop,
  marginBottom,
  padding,
  paddingLeft,
  paddingRight,
  paddingTop,
  paddingBottom,
  width,
  height,
  maxWidth,
  maxHeight,
  border,
  borderTop,
  borderBottom,
  borderLeft,
  borderRight,
  borderRadius,
  background,
  backgroundColor,
  display,
  position,
  zIndex,
  overflow,
  boxShadow,
  opacity,
  flexShrink,
  flexGrow,
  flexBasis,
  flex,
  style: styleProp = {},
}: ContainerProps) => {
  const clz = classes(
    styles.box,
    margin && styles.margin,
    marginLeft && styles.marginLeft,
    marginRight && styles.marginRight,
    marginTop && styles.marginTop,
    marginBottom && styles.marginBottom,
    padding && styles.padding,
    paddingLeft && styles.paddingLeft,
    paddingRight && styles.paddingRight,
    paddingTop && styles.paddingTop,
    paddingBottom && styles.paddingBottom,
    width && styles.width,
    height && styles.height,
    maxWidth && styles.maxWidth,
    maxHeight && styles.maxHeight,
    border && styles.border,
    borderTop && styles.borderTop,
    borderBottom && styles.borderBottom,
    borderLeft && styles.borderLeft,
    borderRight && styles.borderRight,
    borderRadius && styles.borderRadius,
    background && styles.background,
    backgroundColor && styles.backgroundColor,
    display && styles.display,
    position && styles.position,
    zIndex && styles.zIndex,
    overflow && styles.overflow,
    boxShadow && styles.boxShadow,
    opacity && styles.opacity,
    flexShrink && styles.flexShrink,
    flexGrow && styles.flexGrow,
    flexBasis && styles.flexBasis,
    flex && styles.flex,
    className
  );

  // Creating CSS variable styles for margin, padding, and other properties
  const varStyles = {
    '--bx-margin': typeof margin === 'number' ? `${margin}px` : margin,
    '--bx-margin-left': typeof marginLeft === 'number' ? `${marginLeft}px` : marginLeft,
    '--bx-margin-right': typeof marginRight === 'number' ? `${marginRight}px` : marginRight,
    '--bx-margin-top': typeof marginTop === 'number' ? `${marginTop}px` : marginTop,
    '--bx-margin-bottom': typeof marginBottom === 'number' ? `${marginBottom}px` : marginBottom,

    '--bx-padding': typeof padding === 'number' ? `${padding}px` : padding,
    '--bx-padding-left': typeof paddingLeft === 'number' ? `${paddingLeft}px` : paddingLeft,
    '--bx-padding-right': typeof paddingRight === 'number' ? `${paddingRight}px` : paddingRight,
    '--bx-padding-top': typeof paddingTop === 'number' ? `${paddingTop}px` : paddingTop,
    '--bx-padding-bottom': typeof paddingBottom === 'number' ? `${paddingBottom}px` : paddingBottom,

    '--bx-width': typeof width === 'number' ? `${width}px` : width,
    '--bx-height': typeof height === 'number' ? `${height}px` : height,
    '--bx-max-width': typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth,
    '--bx-max-height': typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight,

    '--bx-border': border,
    '--bx-border-top': borderTop,
    '--bx-border-bottom': borderBottom,
    '--bx-border-left': borderLeft,
    '--bx-border-right': borderRight,
    '--bx-border-radius': typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,

    '--bx-background': background,
    '--bx-background-color': backgroundColor,

    '--bx-display': display,
    '--bx-position': position,
    '--bx-z-index': zIndex,
    '--bx-overflow': overflow,
    '--bx-box-shadow': boxShadow,
    '--bx-opacity': opacity,
    '--bx-flex-shrink': flexShrink,
    '--bx-flex-grow': flexGrow,
    '--bx-flex-basis': typeof flexBasis === 'number' ? `${flexBasis}px` : flexBasis,
    '--bx-flex': typeof flex === 'number' ? `${flex}` : flex,
  };

  return React.createElement(
    as,
    {
      className: clz,
      style: { ...styleProp, ...varStyles },
    },
    children
  );
};
