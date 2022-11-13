import React from 'react';
import styled from 'styled-components';
import type { CustomColorCssProperties } from '../Container/Container';
import { useStyleProps } from '../Container/Container';

type FlexProps = CustomColorCssProperties & {
  children: React.ReactNode;
  className?: string;
};

const FlexItem = React.forwardRef<HTMLDivElement, FlexProps>(
  ({ children, className, ...styles }, ref) => {
    const style = useStyleProps(styles);
    return (
      <StyledFlexItemDiv ref={ref} className={className} style={style}>
        {children}
      </StyledFlexItemDiv>
    );
  }
);

FlexItem.displayName = 'FlexItem';

const StyledFlexItemDiv = styled.div`
  flex: 1 0 auto;
`;

export default FlexItem;
