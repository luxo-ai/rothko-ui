import React from 'react';
import styled from 'styled-components';
import extractAriaProps from './extractAriaProps';

type ContainerProps = React.AriaAttributes &
  React.CSSProperties & {
    id?: string;
    as?: keyof JSX.IntrinsicElements;
    children: React.ReactNode;
    className?: string;
    onFocus?: React.FocusEventHandler<HTMLElement>;
    onBlur?: React.FocusEventHandler<HTMLElement>;
    onClick?: React.MouseEventHandler<HTMLElement>;
    role?: React.AriaRole;
  };

const Container = React.forwardRef<HTMLDivElement, ContainerProps>((props, ref) => {
  const {
    props: { as, id, children, onBlur, onFocus, onClick, className, role, ...style },
    ariaAttributes,
  } = extractAriaProps(props);
  return (
    <StyledContainerDiv
      {...ariaAttributes}
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
});

Container.displayName = 'Container';

const StyledContainerDiv = styled.div``;

export default Container;
