import React from 'react';
import styled from 'styled-components';

type FlexProps = React.CSSProperties & {
  as?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onFocus?: React.FocusEventHandler<HTMLElement>;
  onBlur?: React.FocusEventHandler<HTMLElement>;
  role?: React.AriaRole;
};

const FlexItem = React.forwardRef<HTMLDivElement, FlexProps>(
  ({ as, children, className, onClick, onBlur, onFocus, role, ...style }, ref) => {
    return (
      <StyledFlexItemDiv
        as={as}
        ref={ref}
        onBlur={onBlur}
        onFocus={onFocus}
        onClick={onClick}
        className={className}
        style={style}
        role={role}
      >
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
