/* eslint-disable react/no-unused-prop-types */
import React from 'react';

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

const Container = React.forwardRef<HTMLElement, ContainerProps>((props, ref) => {
  const {
    props: { as = 'div', id, children, onBlur, onFocus, onClick, className, role, ...style },
    ariaAttributes,
  } = extractAriaProps(props);
  return React.createElement(
    as,
    {
      ...ariaAttributes,
      id,
      ref,
      onClick,
      onBlur,
      onFocus,
      className,
      style,
      role,
    },
    children
  );
});

Container.displayName = 'Container';

export default Container;
