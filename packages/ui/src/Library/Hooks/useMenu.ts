import React, { useCallback, useRef, useState } from 'react';
import { debugFactory } from '../../utils/utils';
import { FocusHandler } from '../types';

const debug = debugFactory('useMenu');

type HookArgs = {
  onFocus?: FocusHandler;
  onBlur?: FocusHandler;
  onOpen?: () => void;
  disabled?: boolean;
};

const useMenu = <
  ContainerEl extends HTMLElement = HTMLDivElement,
  MenuEl extends HTMLElement = HTMLDivElement
>({
  onFocus,
  onBlur,
  onOpen,
  disabled,
}: HookArgs) => {
  const timeoutId = useRef<NodeJS.Timeout>();
  const containerRef = useRef<ContainerEl>(null);
  const menuRef = useRef<MenuEl>(null);

  const [open, setOpen] = useState<boolean>(false);
  const [focus, setFocus] = useState<boolean>(false);

  const onFocusHandler = useCallback(
    (e: React.FocusEvent<HTMLElement>) => {
      debug('focus');
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
      onFocus?.(e);
      setFocus(true);
    },
    [onFocus, setFocus]
  );

  const onBlurHandler = useCallback(
    // close on blur default
    (e: React.FocusEvent<HTMLElement>) => {
      const { currentTarget } = e;
      // Check the newly focused element in the next tick of the event loop
      timeoutId.current = setTimeout(() => {
        // Check if the new activeElement is a child of the original container
        if (!currentTarget.contains(document.activeElement)) {
          debug('onBlur');
          onBlur?.(e);
          setFocus(false);
          setOpen(false);
        }
      }, 0);
    },
    [onBlur, setFocus, setOpen]
  );

  const closeMenu = () => {
    if (!open) return;
    debug('closeMenu');
    setOpen(false);
    setFocus(false);
    containerRef.current?.blur();
    menuRef.current?.blur();
  };

  const openMenu = () => {
    if (open || disabled) return;
    debug('openMenu');
    onOpen?.();
    setOpen(true);
  };

  const scrollIntoView = useCallback(
    (childSelector: string) => {
      debug('scrollIntoView');
      const menu = menuRef.current;
      if (!menu) return;

      const childElement = menu.querySelector<HTMLElement>(childSelector);
      if (!childElement) return;

      const isOutOfUpperView = childElement.offsetTop < menu.scrollTop;
      const isOutOfLowerView =
        childElement.offsetTop + childElement.clientHeight > menu.scrollTop + menu.clientHeight;

      if (isOutOfUpperView) {
        menu.scrollTop = childElement.offsetTop;
      } else if (isOutOfLowerView) {
        // eslint-disable-next-line no-mixed-operators
        menu.scrollTop = childElement.offsetTop + childElement.clientHeight - menu.clientHeight;
      }
    },
    [menuRef]
  );

  return {
    containerRef,
    menuRef,
    open,
    focus,
    onBlurHandler,
    onFocusHandler,
    closeMenu,
    openMenu,
    scrollIntoView,
  };
};

export default useMenu;
