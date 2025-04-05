import { classes } from '@helpers';
import React from 'react';

import styles from './Flex.module.scss';
import { Container, type ContainerProps } from '../container';

type ContentAlignment =
  | 'center'
  | 'flex-start'
  | 'flex-end'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | 'initial'
  | 'inherit'
  | 'unset';

type ItemAlignment =
  | 'center'
  | 'flex-start'
  | 'flex-end'
  | 'stretch'
  | 'baseline'
  | 'initial'
  | 'inherit'
  | 'unset';

interface FlexProps extends ContainerProps {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  justifyContent?: ContentAlignment;
  alignItems?: ItemAlignment;
  gap?: string | number;
  flexWrap?: 'wrap' | 'nowrap';
  flexDirection?: 'row' | 'column';
  rowGap?: string | number;
  columnGap?: string | number;
  flexShrink?: number;
  flexGrow?: number;
  flexBasis?: string | number;
  alignContent?: ContentAlignment;
  justifyItems?: ItemAlignment;
  alignSelf?: ItemAlignment;
  justifySelf?: ItemAlignment;
  flex?: string | number;
}

export const Flex = ({
  children,
  className,
  justifyContent,
  alignItems,
  gap,
  flexWrap,
  flexDirection,
  rowGap,
  columnGap,
  flexShrink,
  flexGrow,
  flexBasis,
  alignContent,
  justifyItems,
  alignSelf,
  justifySelf,
  flex,
  style: styleProp = {},
  // ====== boxProps =========
  as,
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
}: FlexProps) => {
  const clz = classes(
    styles.flex,
    justifyContent && styles.justifyContent,
    alignItems && styles.alignItems,
    gap && styles.gap,
    flexWrap && styles.flexWrap,
    flexDirection && styles.flexDirection,
    rowGap && styles.rowGap,
    columnGap && styles.columnGap,
    flexShrink && styles.flexShrink,
    flexGrow && styles.flexGrow,
    flexBasis && styles.flexBasis,
    alignContent && styles.alignContent,
    justifyItems && styles.justifyItems,
    alignSelf && styles.alignSelf,
    justifySelf && styles.justifySelf,
    flex && styles.flex,
    className
  );

  const varStyles = {
    '--flx-justify-content': justifyContent,
    '--flx-align-items': alignItems,
    '--flx-gap': typeof gap === 'number' ? `${gap}px` : gap,
    '--flx-flex-wrap': flexWrap,
    '--flx-flex-direction': flexDirection,
    '--flx-row-gap': typeof rowGap === 'number' ? `${rowGap}px` : rowGap,
    '--flx-column-gap': typeof columnGap === 'number' ? `${columnGap}px` : columnGap,
    '--flx-flex-shrink': flexShrink,
    '--flx-flex-grow': flexGrow,
    '--flx-flex-basis': typeof flexBasis === 'number' ? `${flexBasis}px` : flexBasis,
    '--flx-align-content': alignContent,
    '--flx-justify-items': justifyItems,
    '--flx-align-self': alignSelf,
    '--flx-justify-self': justifySelf,
    '--flx-flex': typeof flex === 'number' ? `${flex}` : flex,
  };

  return (
    <Container
      as={as}
      margin={margin}
      marginLeft={marginLeft}
      marginRight={marginRight}
      marginTop={marginTop}
      marginBottom={marginBottom}
      padding={padding}
      paddingLeft={paddingLeft}
      paddingRight={paddingRight}
      paddingTop={paddingTop}
      paddingBottom={paddingBottom}
      width={width}
      height={height}
      maxWidth={maxWidth}
      maxHeight={maxHeight}
      border={border}
      borderTop={borderTop}
      borderBottom={borderBottom}
      borderLeft={borderLeft}
      borderRight={borderRight}
      borderRadius={borderRadius}
      backgroundColor={backgroundColor || background}
      display={display}
      position={position}
      zIndex={zIndex}
      overflow={overflow}
      boxShadow={boxShadow}
      opacity={opacity}
      flexShrink={flexShrink}
      flexGrow={flexGrow}
      flexBasis={flexBasis}
      flex={flex}
      className={clz}
      style={{ ...styleProp, ...varStyles }}
    >
      {children}
    </Container>
  );
};
