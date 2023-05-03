import React from 'react';
import styled from 'styled-components';
import type { CustomColorCssProperties } from '../Container/Container';
import { useStyleProps } from '../Container/Container';
import { idkFn } from '../../Theme/theme';
import type { HexColor, RGBColor, RothkoKind } from '../../Theme';
import { isRothkoKind } from '../../Theme';
import type { EmSize, RemSize } from '../../types';

type Size = EmSize | RemSize | number;

type DotProps = Omit<
  CustomColorCssProperties,
  'backgroundColor' | 'borderRadius' | 'height' | 'width' | 'color'
> & {
  color?: RothkoKind | HexColor | RGBColor;
  size: Size;
};

const Dot = React.forwardRef<HTMLDivElement, DotProps>(({ size, color, ...styles }, ref) => {
  const style = useStyleProps(styles);
  return <DotDiv ref={ref} $color={color} $size={size} style={style} />;
});

Dot.displayName = 'Dot';

type DotElProps = {
  $color?: RothkoKind | HexColor | RGBColor;
  $size: Size;
};

const DotDiv = styled.div<DotElProps>`
  width: ${({ $size }) => (typeof $size === 'number' ? `${$size}px` : $size)};
  height: ${({ $size }) => (typeof $size === 'number' ? `${$size}px` : $size)};
  border-radius: calc(${({ $size }) => (typeof $size === 'number' ? `${$size}px` : $size)} / 2);
  background-color: ${({ $color = '#000' }) => (isRothkoKind($color) ? idkFn($color) : $color)};
`;

export default Dot;
