import React from 'react';
import styled from 'styled-components';
import type { CustomColorCssProperties } from '../Container/Container';
import { useStyleProps } from '../Container/Container';

type FlexProps = CustomColorCssProperties & {
  as?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
  className?: string;
};

const FlexItem = React.forwardRef<HTMLDivElement, FlexProps>(
  ({ as, children, className, ...styles }, ref) => {
    const style = useStyleProps(styles);
    return (
      <StyledFlexItemDiv as={as} ref={ref} className={className} style={style}>
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
