import React from 'react';
import type { CSSProperties } from 'styled-components';
import styled from 'styled-components';
import type { CanColor } from '../Theme/ThemeContext';
import { useKindTheme } from '../Theme/ThemeContext';
import type { RothkoKind, GreyScale } from '../Theme/types';

export type ContainerProps = {
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  kind?: RothkoKind | GreyScale;
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

Container.displayName = 'Container';

const ContainerBase = styled.div<CanColor>`
  background: ${({ themeColorer }) => themeColorer()}
  color: ${({ themeColorer }) => themeColorer('text')}
`;
