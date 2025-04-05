import { classes } from '@helpers';
import React from 'react';

import styles from './Grid.module.scss';
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

interface GridProps extends ContainerProps {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  gridTemplateColumns?: string;
  gridTemplateRows?: string;
  gridTemplateAreas?: string;
  gridGap?: string | number;
  gridColumnGap?: string | number;
  gridRowGap?: string | number;
  gridAutoColumns?: string;
  gridAutoRows?: string;
  gridAutoFlow?: 'row' | 'column' | 'dense';
  gridColumn?: string;
  gridRow?: string;
  gridColumnStart?: string;
  gridColumnEnd?: string;
  gridRowStart?: string;
  gridRowEnd?: string;
  justifyContent?: ContentAlignment;
  justifyItems?: ItemAlignment;
  alignContent?: ContentAlignment;
  placeItems?: ItemAlignment;
  placeContent?: ContentAlignment;
  placeSelf?: ItemAlignment;
  justifySelf?: ItemAlignment;
  alignSelf?: ItemAlignment;
  alignItems?: ItemAlignment;
  gap?: string | number;
  rowGap?: string | number;
  columnGap?: string | number;
}

export const Grid = ({
  children,
  className,
  gridTemplateColumns,
  gridTemplateRows,
  gridTemplateAreas,
  gridGap,
  gridColumnGap,
  gridRowGap,
  gridAutoColumns,
  gridAutoRows,
  gridAutoFlow,
  gridColumn,
  gridRow,
  gridColumnStart,
  gridColumnEnd,
  gridRowStart,
  gridRowEnd,
  alignItems,
  justifyContent,
  justifyItems,
  alignContent,
  placeItems,
  placeContent,
  placeSelf,
  justifySelf,
  alignSelf,
  gap,
  rowGap,
  columnGap,
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
  flexShrink,
  flexGrow,
  flexBasis,
  flex,
}: GridProps) => {
  const gapValue = gap || gridGap;
  const rowGapValue = rowGap || gridRowGap;
  const colGapValue = columnGap || gridColumnGap;

  const clz = classes(
    styles.grid,
    gridTemplateColumns && styles.gridTemplateColumns,
    gridTemplateRows && styles.gridTemplateRows,
    gridTemplateAreas && styles.gridTemplateAreas,
    gridAutoColumns && styles.gridAutoColumns,
    gridAutoRows && styles.gridAutoRows,
    gridAutoFlow && styles.gridAutoFlow,
    gridColumn && styles.gridColumn,
    gridRow && styles.gridRow,
    gridColumnStart && styles.gridColumnStart,
    gridColumnEnd && styles.gridColumnEnd,
    gridRowStart && styles.gridRowStart,
    gridRowEnd && styles.gridRowEnd,
    justifyContent && styles.justifyContent,
    justifyItems && styles.justifyItems,
    alignContent && styles.alignContent,
    placeItems && styles.placeItems,
    placeContent && styles.placeContent,
    placeSelf && styles.placeSelf,
    justifySelf && styles.justifySelf,
    alignSelf && styles.alignSelf,
    alignItems && styles.alignItems,
    gapValue && styles.gap,
    rowGapValue && styles.rowGap,
    colGapValue && styles.columnGap,
    className
  );

  const varStyles = {
    '--grd-grid-template-columns': gridTemplateColumns,
    '--grd-grid-template-rows': gridTemplateRows,
    '--grd-grid-template-areas': gridTemplateAreas,
    '--grd-gap': typeof gapValue === 'number' ? `${gapValue}px` : gapValue,
    '--grd-column-gap': typeof colGapValue === 'number' ? `${colGapValue}px` : colGapValue,
    '--grd-row-gap': typeof rowGapValue === 'number' ? `${rowGapValue}px` : rowGapValue,
    '--grd-grid-auto-columns': gridAutoColumns,
    '--grd-grid-auto-rows': gridAutoRows,
    '--grd-grid-auto-flow': gridAutoFlow,
    '--grd-grid-column': gridColumn,
    '--grd-grid-row': gridRow,
    '--grd-grid-column-start': gridColumnStart,
    '--grd-grid-column-end': gridColumnEnd,
    '--grd-grid-row-start': gridRowStart,
    '--grd-grid-row-end': gridRowEnd,
    '--grd-align-items': alignItems,
    '--grd-justify-content': justifyContent,
    '--grd-justify-items': justifyItems,
    '--grd-align-content': alignContent,
    '--grd-place-items': placeItems,
    '--grd-place-content': placeContent,
    '--grd-place-self': placeSelf,
    '--grd-justify-self': justifySelf,
    '--grd-align-self': alignSelf,
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
