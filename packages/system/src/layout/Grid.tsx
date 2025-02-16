/* eslint-disable react/no-unused-prop-types */
import React from 'react';

import extractAriaProps from './extractAriaProps';
import styles from './Grid.module.scss';
import { classes } from '../utils/classes';

type GridProps = React.AriaAttributes &
  Omit<React.CSSProperties, 'display'> & {
    as?: keyof JSX.IntrinsicElements;
    children: React.ReactNode;
    className?: string;
    role?: React.AriaRole;
    onFocus?: React.FocusEventHandler<HTMLElement>;
    onBlur?: React.FocusEventHandler<HTMLElement>;
    onClick?: React.MouseEventHandler<HTMLElement>;
  };

const Grid = React.forwardRef<HTMLElement, GridProps>((props, ref) => {
  const {
    props: { as = 'div', role, onBlur, onClick, onFocus, children, className, ...style },
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
      className: classes(className, styles.grid),
      style,
      role,
    },
    children
  );
});

Grid.displayName = 'Grid';

export default Grid;
