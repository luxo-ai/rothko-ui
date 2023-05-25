import React from 'react';
import styled from 'styled-components';
import type { CustomColorCssProperties } from '../Container';
import { useStyleProps } from '../Container';

type GridProps = Omit<CustomColorCssProperties, 'display'> & {
  as?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
  className?: string;
  role?: React.AriaRole;
  ariaLabel?: string;
};

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ as, role, ariaLabel, children, className, ...styles }, ref) => {
    const style = useStyleProps(styles);
    return (
      <StyledGrid
        aria-label={ariaLabel}
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
