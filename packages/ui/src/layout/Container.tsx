import React from 'react';
import styled from 'styled-components';

type ContainerProps = React.CSSProperties & {
  id?: string;
  as?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
  className?: string;
  onFocus?: React.FocusEventHandler<HTMLElement>;
  onBlur?: React.FocusEventHandler<HTMLElement>;
  onClick?: React.MouseEventHandler<HTMLElement>;
  role?: React.AriaRole;
};

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ as, id, children, onBlur, onFocus, onClick, className, role, ...style }, ref) => {
    return (
      <StyledContainerDiv
        id={id}
        ref={ref}
        as={as}
        onClick={onClick}
        onBlur={onBlur}
        onFocus={onFocus}
        className={className}
        style={style}
        role={role}
      >
        {children}
      </StyledContainerDiv>
    );
  }
);

Container.displayName = 'Container';

const StyledContainerDiv = styled.div``;

export default Container;
