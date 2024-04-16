import React from 'react';
import styled from 'styled-components';

type GridSpanProps = Omit<React.CSSProperties, 'gridColumnStart' | 'gridColumnEnd'> & {
  as?: keyof JSX.IntrinsicElements;
  children?: React.ReactNode;
  className?: string;
  span: number;
  start: number;
  onFocus?: React.FocusEventHandler<HTMLElement>;
  onBlur?: React.FocusEventHandler<HTMLElement>;
  onClick?: React.MouseEventHandler<HTMLElement>;
  role?: React.AriaRole;
};

const GridSpan = React.forwardRef<HTMLDivElement, GridSpanProps>(
  ({ as, onClick, onBlur, onFocus, children, className, span, start, role, ...style }, ref) => {
    return (
      <StyledGridSpanDiv
        onClick={onClick}
        onFocus={onFocus}
        onBlur={onBlur}
        as={as}
        className={className}
        ref={ref}
        span={span}
        start={start}
        style={style}
        role={role}
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
