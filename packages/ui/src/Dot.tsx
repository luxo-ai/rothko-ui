import React from 'react';
import styled from 'styled-components';
import type { CustomColorCssProperties } from './Container/Container';
import { useStyleProps } from './Container/Container';
import { idkFn } from './Theme/themeV2';
import type { HexColor, RGBColor, RothkoKind } from './Theme/types';
import { isRothkoKind } from './Theme/types';
import type { EmSize, RemSize } from './types';

type Size = EmSize | RemSize;

type DotProps = Omit<
  CustomColorCssProperties,
  'backgroundColor' | 'borderRadius' | 'height' | 'width'
> & {
  dotColor?: RothkoKind | HexColor | RGBColor;
  size: Size;
};

const Dot = React.forwardRef<HTMLDivElement, DotProps>(({ size, dotColor, ...styles }, ref) => {
  const style = useStyleProps(styles);
  return <DotDiv ref={ref} dotColor={dotColor} size={size} style={style} />;
});

Dot.displayName = 'Dot';

type DotElProps = {
  dotColor?: RothkoKind | HexColor | RGBColor;
  size: Size;
};

const DotDiv = styled.div<DotElProps>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: calc(${({ size }) => size} / 2);
  background-color: ${({ dotColor = '#000' }) =>
    isRothkoKind(dotColor) ? idkFn(dotColor) : dotColor};
`;

export default Dot;
