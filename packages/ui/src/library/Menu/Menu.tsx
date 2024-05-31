import React, { useImperativeHandle, useMemo } from 'react';
import { classes, scopedClasses as sc } from '@rothko-ui/utils';
import styles from './Menu.module.scss';
import MenuContext from './MenuContext';
import useScrollIntoView from '../hooks/useScrollIntoView';
import type { MenuVariant, ScrollableHTMLElement } from './types';

const scoppedClasses = sc(styles);

type MenuProps = Omit<React.HTMLProps<HTMLUListElement>, 'ref' | 'role' | 'tabIndex'> & {
  /**
   * Whether the modal is open or closed.
   * @default true
   */
  open?: boolean;
  /**
   * The position of the menu.
   * @default 'bottom'
   */
  variant?: MenuVariant;
  /**
   * Whether the menu is disabled.
   * @default false
   */
  disabled?: boolean;
};

const Menu = React.forwardRef<ScrollableHTMLElement, MenuProps>(
  (
    {
      id,
      open = true,
      variant = 'bottom',
      disabled,
      className,
      children,
      style,
      'aria-disabled': ariaDisabled,
      ...listProps
    },
    forwardedRef
  ) => {
    const baseClasses = scoppedClasses('menu', variant === 'top' && 'menu--reverse');

    const { scrollIntoView, scrollElRef } = useScrollIntoView();

    const contextValue = useMemo(() => {
      const numberOfItems = React.Children.count(children);
      return { numberOfItems, disabled: Boolean(disabled), scrollIntoView };
    }, [children, disabled, scrollIntoView]);

    useImperativeHandle(
      forwardedRef,
      () => ({
        scrollToBottom() {
          const node = scrollElRef.current;
          if (!node) return;
          node.scrollTop = node.scrollHeight;
        },
        scrollToTop() {
          const node = scrollElRef.current;
          if (!node) return;
          node.scrollTop = 0;
        },
      }),
      [scrollElRef]
    );

    if (!open) {
      return null;
    }

    return (
      <MenuContext.Provider value={contextValue}>
        <div
          id={id}
          style={style}
          ref={scrollElRef}
          aria-hidden
          className={classes(baseClasses, className)}
        >
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <ul {...listProps} tabIndex={-1} aria-disabled={ariaDisabled || disabled} role="listbox">
            {children}
          </ul>
        </div>
      </MenuContext.Provider>
    );
  }
);

Menu.displayName = 'Menu';

export default Menu;
