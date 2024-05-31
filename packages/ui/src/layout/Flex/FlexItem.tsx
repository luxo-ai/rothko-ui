/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import extractAriaProps from '../extractAriaProps';
import { classes } from '@rothko-ui/utils';
import styles from './FlexItem.module.scss';

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
      className: classes(className, styles['flex-item']),
      style,
      role,
    },
    children
  );
});

FlexItem.displayName = 'FlexItem';

export default FlexItem;
