import React from 'react';
import styled from 'styled-components';
import type { CustomColorCssProperties } from '../Container/Container';
import { useStyleProps } from '../Container/Container';

type FlexProps = Omit<CustomColorCssProperties, 'display'> & {
  as?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
  className?: string;
};

const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  ({ as, children, className, ...styles }, ref) => {
    const style = useStyleProps(styles);
    return (
      <StyledFlexDiv as={as} ref={ref} className={className} style={style}>
        {children}
      </StyledFlexDiv>
    );
  }
);

Flex.displayName = 'Flex';

const StyledFlexDiv = styled.div`
  display: flex;
`;

export default Flex;
