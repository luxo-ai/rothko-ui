import React from 'react';
import type { CSSProperties } from 'styled-components';
import styled from 'styled-components';

type FlexProps = CSSProperties & {
  children: React.ReactNode;
  className?: string;
};

const FlexItem = React.forwardRef<HTMLDivElement, FlexProps>(
  ({ children, className, ...style }, ref) => {
    return (
      <StyledFlexItem ref={ref} className={className} style={style}>
        {children}
      </StyledFlexItem>
    );
  }
);

FlexItem.displayName = 'FlexItem';

const StyledFlexItem = styled.div`
  flex: 1 0 auto;
`;

export default FlexItem;
