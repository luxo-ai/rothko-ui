import React from 'react';
import styled, { CSSProperties } from 'styled-components';
import { AemikoKind, CanColor, useKindTheme } from './Theme';
import { EmSize, RemSize } from './types';

type Size = EmSize | RemSize;

type DotProps = {
  size: Size;
  kind?: AemikoKind;
} & Pick<
  CSSProperties,
  'position' | 'inset' | 'left' | 'right' | 'top' | 'bottom' | 'margin' | 'padding' | 'border'
>;

export const Dot = React.forwardRef<HTMLDivElement, DotProps>(
  ({ size, kind = 'primary', ...style }, ref) => {
    const [colorer] = useKindTheme(kind);
    return <DotDiv ref={ref} themeColorer={colorer} size={size} style={style} />;
  }
);

type DotElProps = CanColor & { size: Size };

const DotDiv = styled.div<DotElProps>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: calc(${({ size }) => size} / 2);
  background-color: ${({ themeColorer }) => themeColorer()};
`;
