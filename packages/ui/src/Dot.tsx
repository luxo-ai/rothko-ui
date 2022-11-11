import React from 'react';
import type { CSSProperties } from 'styled-components';
import styled from 'styled-components';
import type { AemikoKind, CanColor } from './Theme';
import { useKindTheme } from './Theme';
import type { EmSize, RemSize } from './types';

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

Dot.displayName = 'Dot';

type DotElProps = CanColor & { size: Size };

const DotDiv = styled.div<DotElProps>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: calc(${({ size }) => size} / 2);
  background-color: ${({ themeColorer }) => themeColorer()};
`;
