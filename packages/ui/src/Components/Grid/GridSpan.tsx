import React from 'react';
import styled from 'styled-components';
import type { CustomColorCssProperties } from '../Container/Container';
import { useStyleProps } from '../Container/Container';

type GridSpanProps = Omit<CustomColorCssProperties, 'gridColumnStart' | 'gridColumnEnd'> & {
  as?: keyof JSX.IntrinsicElements;
  children?: React.ReactNode;
  className?: string;
  span: number;
  start: number;
};

const GridSpan = React.forwardRef<HTMLDivElement, GridSpanProps>(
  ({ as, children, className, span, start, ...styles }, ref) => {
    const style = useStyleProps(styles);
    return (
      <StyledGridSpanDiv
        as={as}
        className={className}
        ref={ref}
        span={span}
        start={start}
        style={style}
      >
        {children}
      </StyledGridSpanDiv>
    );
  }
);

GridSpan.displayName = 'GridSpan';

const StyledGridSpanDiv = styled.div<{ start: number; span: number }>`
  grid-column-start: ${({ start }) => start};
  grid-column-end: span ${({ span }) => span};
`;

export default GridSpan;
