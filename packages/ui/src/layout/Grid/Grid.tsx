import React from 'react';
import styled from 'styled-components';

type GridProps = Omit<React.CSSProperties, 'display'> & {
  as?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
  className?: string;
  role?: React.AriaRole;
  onFocus?: React.FocusEventHandler<HTMLElement>;
  onBlur?: React.FocusEventHandler<HTMLElement>;
  onClick?: React.MouseEventHandler<HTMLElement>;
};

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ as, role, onBlur, onClick, onFocus, children, className, ...style }, ref) => {
    return (
      <StyledGrid
        onFocus={onFocus}
        onClick={onClick}
        onBlur={onBlur}
        role={role}
        as={as}
        ref={ref}
        className={className}
        style={style}
      >
        {children}
      </StyledGrid>
    );
  }
);

Grid.displayName = 'Grid';

const StyledGrid = styled.div`
  display: grid;
`;

export default Grid;
