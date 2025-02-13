import React, { useImperativeHandle, useMemo } from 'react';
import { classes, useScrollIntoView } from '@rothko-ui/system';
import MenuContext from './MenuContext';
import type { MenuVariant, ScrollableHTMLElement } from './types';

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
    const clz = classes(
      'hide-chrome-browser-outline',
      'w-full',
      'overflow-y-scroll',
      'webkit-overflow-scrolling-touch',
      'bg-(--rothko-dropdown-background)',
      !disabled && 'cursor-default',
      'absolute',
      'left-0',
      variant === 'bottom' && 'menu-top', //  top-[calc(100%+0.25rem)] wasn't working
      variant === 'top' && 'bottom-[calc(100%+0.25rem)]',
      'rounded-[0.125rem]',
      'shadow-[0px_0px_12px_rgba(0,0,0,0.03),_0px_2px_8px_rgba(0,0,0,0.06)]',
      disabled && 'cursor-not-allowed',
      disabled && 'opacity-60',
      // ====== text
      'text-(--rothko-typography-body-color)',
      'font-rothko-regular',
      'font-size-(--rothko-font-size-body)',
      'leading-(--rothko-line-height-body)',
      //
      className
    );

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
          className={clz}
          data-rothko-body-scroll-lock-ignore
        >
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <ul
            {...listProps}
            tabIndex={-1}
            aria-disabled={ariaDisabled || disabled}
            className="list-none p-0 m-0"
            role="listbox"
          >
            {children}
          </ul>
        </div>
      </MenuContext.Provider>
    );
  }
);

Menu.displayName = 'Menu';

export default Menu;
