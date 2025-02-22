/* eslint-disable react/no-unused-prop-types */
import React from 'react';

import extractAriaProps from './extractAriaProps';
import { classes } from '../utils/classes';

type FlexProps = React.AriaAttributes &
  React.CSSProperties & {
    as?: keyof JSX.IntrinsicElements;
    children: React.ReactNode;
    className?: string;
    onClick?: React.MouseEventHandler<HTMLElement>;
    onFocus?: React.FocusEventHandler<HTMLElement>;
    onBlur?: React.FocusEventHandler<HTMLElement>;
    role?: React.AriaRole;
  };

const FlexItem = React.forwardRef<HTMLElement, FlexProps>((props, ref) => {
  const {
    props: { as = 'div', children, className, onClick, onBlur, onFocus, role, ...style },
    ariaAttributes,
  } = extractAriaProps(props);
  return React.createElement(
    as,
    {
      ...ariaAttributes,
      ref,
      onClick,
      onFocus,
      onBlur,
      className: classes(className, 'flex-1 shrink-0 basis-auto'),
      style,
      role,
    },
    children
  );
});

FlexItem.displayName = 'FlexItem';

export default FlexItem;
