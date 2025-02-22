/* eslint-disable react/no-unused-prop-types */
import React from 'react';

import extractAriaProps from './extractAriaProps';
import { classes } from '../utils/classes';

type FlexProps = React.AriaAttributes &
  Omit<React.CSSProperties, 'display'> & {
    id?: string;
    as?: keyof JSX.IntrinsicElements;
    children: React.ReactNode;
    className?: string;
    onFocus?: React.FocusEventHandler<HTMLElement>;
    onBlur?: React.FocusEventHandler<HTMLElement>;
    onClick?: React.MouseEventHandler<HTMLElement>;
    role?: React.AriaRole;
  };

const Flex = React.forwardRef<HTMLElement, FlexProps>((props, ref) => {
  const {
    props: { id, as = 'div', children, className, role, onClick, onBlur, onFocus, ...style },
    ariaAttributes,
  } = extractAriaProps(props);

  return React.createElement(
    as,
    {
      ...ariaAttributes,
      id,
      ref,
      onClick,
      onFocus,
      onBlur,
      className: classes(className, 'flex'),
      style,
      role,
    },
    children
  );
});

Flex.displayName = 'Flex';

export default Flex;
