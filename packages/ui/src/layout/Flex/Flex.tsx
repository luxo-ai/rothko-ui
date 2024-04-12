import React from 'react';
import styled from 'styled-components';
import type { CustomColorCssProperties } from '../Container';
import { useStyleProps } from '../Container';

type FlexProps = Omit<CustomColorCssProperties, 'display'> & {
  as?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  role?: React.AriaRole;
};

const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  ({ as, children, className, role, onClick, ...styles }, ref) => {
    const style = useStyleProps(styles);
    return (
      <StyledFlexDiv
        role={role}
        as={as}
        ref={ref}
        onClick={onClick}
        className={className}
        style={style}
      >
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
