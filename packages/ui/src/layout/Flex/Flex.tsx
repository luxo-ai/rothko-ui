import { classes } from '@rothko-ui/utils';
import React from 'react';
import extractAriaProps from '../extractAriaProps';
import styles from './Flex.module.scss';

type FlexProps = React.AriaAttributes &
  Omit<React.CSSProperties, 'display'> & {
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
    props: { as = 'div', children, className, role, onClick, onBlur, onFocus, ...style },
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
      className: classes(className, styles.flex),
      style,
      role,
    },
    children
  );
});

Flex.displayName = 'Flex';

export default Flex;
