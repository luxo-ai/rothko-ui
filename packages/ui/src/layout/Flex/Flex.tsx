import React from 'react';
import styled from 'styled-components';

type FlexProps = Omit<React.CSSProperties, 'display'> & {
  as?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
  className?: string;
  onFocus?: React.FocusEventHandler<HTMLElement>;
  onBlur?: React.FocusEventHandler<HTMLElement>;
  onClick?: React.MouseEventHandler<HTMLElement>;
  role?: React.AriaRole;
};

const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  ({ as, children, className, role, onClick, onBlur, onFocus, ...style }, ref) => {
    return (
      <StyledFlexDiv
        role={role}
        as={as}
        ref={ref}
        onClick={onClick}
        onFocus={onFocus}
        onBlur={onBlur}
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
