import React from 'react';
import styled from 'styled-components';
import extractAriaProps from '../extractAriaProps';

type FlexProps = React.AriaAttributes &
  React.CSSProperties & {
    as?: keyof JSX.IntrinsicElements;
    children: React.ReactNode;
    className?: string;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    onFocus?: React.FocusEventHandler<HTMLElement>;
    onBlur?: React.FocusEventHandler<HTMLElement>;
    role?: React.AriaRole;
  };

const FlexItem = React.forwardRef<HTMLDivElement, FlexProps>((props, ref) => {
  const {
    props: { as, children, className, onClick, onBlur, onFocus, role, ...style },
    ariaAttributes,
  } = extractAriaProps(props);
  return (
    <StyledFlexItemDiv
      {...ariaAttributes}
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
});

FlexItem.displayName = 'FlexItem';

const StyledFlexItemDiv = styled.div`
  flex: 1 0 auto;
`;

export default FlexItem;
