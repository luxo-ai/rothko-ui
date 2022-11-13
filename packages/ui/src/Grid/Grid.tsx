import React from 'react';
import type { CSSProperties } from 'styled-components';
import styled from 'styled-components';

type GridProps = {
  children: React.ReactNode;
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
} & CSSProperties;

const Grid: React.FC<GridProps> = React.forwardRef<HTMLDivElement, GridProps>(
  ({ children, className, ...style }, ref) => {
    return (
      <StyledGrid ref={ref} className={className} style={style}>
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
