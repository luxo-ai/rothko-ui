import React from 'react';
import styled from 'styled-components';

// CONSOLIDATE WITH CONTAINER

type BoxProps = React.CSSProperties & {
  id?: string;
  as?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
};

const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ as, id, children, className, ariaLabel, ...styles }, ref) => {
    return (
      <StyledBoxDiv
        id={id}
        ref={ref}
        as={as}
        aria-label={ariaLabel}
        className={className}
        style={styles}
      >
        {children}
      </StyledBoxDiv>
    );
  }
);

Box.displayName = 'Box';

const StyledBoxDiv = styled.div`
  background-color: var(--rothko-box-background, #fff);
  border-color: var(--rothko-box-border, #000);
`;

export default Box;
