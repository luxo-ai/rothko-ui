import React from 'react';
import styled from 'styled-components';
import type { CustomColorCssProperties } from '../Container/Container';
import { useStyleProps } from '../Container/Container';

type GridProps = Omit<CustomColorCssProperties, 'display'> & {
  as?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
  className?: string;
};

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ as, children, className, ...styles }, ref) => {
    const style = useStyleProps(styles);
    return (
      <StyledGrid as={as} ref={ref} className={className} style={style}>
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
