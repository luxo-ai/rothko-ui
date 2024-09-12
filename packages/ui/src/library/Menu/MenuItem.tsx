'use client';

import React, { useContext, useEffect } from 'react';
import { classes, scopedClasses } from '@rothko-ui/utils';
import styles from './Menu.module.scss';
import MenuContext from './MenuContext';
import useId from '../hooks/useId';

const sc = scopedClasses(styles);

type MenuProps = Omit<React.HTMLProps<HTMLLIElement>, 'id' | 'ref' | 'role' | 'tabIndex'> & {
  focused?: boolean;
  disabled?: boolean;
};

const MenuItem = React.forwardRef<HTMLLIElement, MenuProps>(
  (
    {
      className,
      disabled: itemDisabled,
      focused: selected,
      children,
      style,
      onClick,
      'aria-selected': ariaSelected,
      'aria-disabled': ariaDisabled,
      ...listProps
    },
    ref
  ) => {
    const id = useId();
    const { disabled: parentDisabled, scrollIntoView } = useContext(MenuContext);
    const disabled = parentDisabled || itemDisabled;
    const baseClasses = sc(
      'menu__item',
      selected && 'menu__item--selected',
      disabled && 'disabled'
    );

    useEffect(() => {
      if (!selected) return;
      scrollIntoView(`#${id}`);
    }, [id, scrollIntoView, selected]);

    return (
      <li
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...listProps}
        id={id}
        style={style}
        ref={ref}
        tabIndex={-1}
        aria-selected={ariaSelected || selected}
        aria-disabled={ariaDisabled || disabled}
        role="option"
        className={classes(baseClasses, className)}
        onClick={e => {
          if (!disabled && onClick) {
            e.preventDefault();
            onClick(e);
          }
        }}
      >
        {children}
      </li>
    );
  }
);

MenuItem.displayName = 'MenuItem';

export default MenuItem;
