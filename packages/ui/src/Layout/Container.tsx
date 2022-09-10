import React from 'react';
import styled, { CSSProperties } from 'styled-components';
import { CanColor, useKindTheme } from '../Theme/ThemeContext';
import { AemikoKind, GreyScale } from '../Theme/types';

export type ContainerProps = {
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  kind?: AemikoKind | GreyScale;
  children?: React.ReactNode;
} & CSSProperties;

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ as, className, kind = 'white', children, ...style }, ref) => {
    const [colorer] = useKindTheme(kind);
    return (
      <ContainerBase themeColorer={colorer} as={as} className={className} style={style} ref={ref}>
        {children}
      </ContainerBase>
    );
  }
);

const ContainerBase = styled.div<CanColor>`
  background: ${({ themeColorer }) => themeColorer()}
  color: ${({ themeColorer }) => themeColorer('text')}
`;
