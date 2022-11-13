import React from 'react';
import type { CSSProperties } from 'styled-components';
import styled from 'styled-components';

type FlexProps = Omit<CSSProperties, 'display'> & {
  children: React.ReactNode;
  className?: string;
};

const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  ({ children, className, ...style }, ref) => {
    return (
      <StyledFlex ref={ref} className={className} style={style}>
        {children}
      </StyledFlex>
    );
  }
);

Flex.displayName = 'Flex';

const StyledFlex = styled.div`
  display: flex;
`;

export default Flex;
