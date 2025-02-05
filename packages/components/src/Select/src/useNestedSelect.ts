import type React from 'react';
import { useCallback, useMemo, useRef, useState } from 'react';

import { isNil, debugFactory, useNestedOptions } from '@rothko-ui/system';

import type { FocusHandler, NestedOption, Value, StackOption } from '@rothko-ui/system';
import { findOptionMatch2, findPathToOptionMatch } from './utils';

type HookArgs<V extends Value, T> = {
  options: NestedOption<V, T>[];
  onChange: (id: V | null) => void;
  onFocus?: FocusHandler;
  onBlur?: FocusHandler;
  onOpen?: () => void;
  onClose?: () => void;
  onClear?: () => void;
  disabled?: boolean;
  value?: V | null;
};

const useNestedDropdown = <V extends Value, T = undefined>({
  options: initialOptions,
  onChange,
  onFocus,
  onBlur,
  onOpen,
  onClear,
  onClose,
  disabled,
  value,
}: HookArgs<V, T>) => {
  const debug = debugFactory('useNestedDropdown');

  const timeoutId = useRef<NodeJS.Timeout>();
  const containerRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState<boolean>(false);
  const [focus, setFocus] = useState<boolean>(false);

  const { options, optIdx, title, moveOptionIdx, optionStack, dispatch } =
    useNestedOptions(initialOptions);

  const closeMenu = () => {
    if (!open) return;
    debug('closeMenu');
    setOpen(false);
    setFocus(false);
    onClose?.();
    containerRef.current?.blur();
    // menuRef.current?.blur();
  };

  const openMenu = () => {
    if (open || disabled) return;
    debug('openMenu');
    if (isNil(value)) {
      // reset if opening to an empty value
      // alternatively reset on close.
      dispatch({ type: 'RESET' });
    }
    onOpen?.();
    setOpen(true);
  };

  const clearValue = useCallback(() => {
    if (disabled) return;
    debug('clearValue');
    onChange(null);
    // reset the option index? + stak?
    onClear?.();
  }, [onChange, onClear, disabled, debug]);

  const onFocusHandler = useCallback(
    (e: React.FocusEvent<HTMLElement>) => {
      debug('focus');
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
      onFocus?.(e);
      setFocus(true);
    },
    [onFocus, setFocus, timeoutId, debug]
  );

  const onBlurHandler = useCallback(
    // close on blur
    (e: React.FocusEvent<HTMLElement>) => {
      const { currentTarget } = e;
      // Check the newly focused element in the next tick of the event loop
      timeoutId.current = setTimeout(() => {
        // Check if the new activeElement is a child of the original container
        if (!currentTarget.contains(document.activeElement)) {
          debug('onBlur');
          onBlur?.(e);
          onClose?.();
          setFocus(false);
          setOpen(false);
        }
      }, 0);
    },
    [onBlur, setFocus, setOpen, onClose, timeoutId, debug]
  );

  const selectOne = useCallback(
    (selectedOpt: StackOption<V, T>) => {
      debug('selectOne');

      if (!selectedOpt.hasMore) {
        return onChange(selectedOpt.id);
      }

      const parentId = selectedOpt.id;
      const depth = optionStack.size();
      const next = parentId && findOptionMatch2(parentId, initialOptions, depth);

      if (!next) {
        throw new Error(`Could not find option with id: ${parentId}`);
      }

      /* if has more push the next options on the stack */
      dispatch({ type: 'PUSH_OPT', op: next });
    },
    [onChange, debug, initialOptions, optionStack, dispatch]
  );

  const goBack = useCallback(() => {
    debug('goBack');
    dispatch({ type: 'POP_OPT' });
  }, [dispatch, debug]);

  const pathToCurrentOption = useMemo(() => {
    if (isNil(value)) return [];
    return findPathToOptionMatch(value, initialOptions);
  }, [value, initialOptions]);

  const canGoToPrevCategory = !optionStack.isEmpty();

  return {
    canGoToPrevCategory,
    clearValue,
    closeMenu,
    containerRef,
    focus,
    goToPrevCategory: goBack,
    moveOptionIdx,
    onBlurHandler,
    onFocusHandler,
    open,
    openMenu,
    optIdx,
    options,
    pathToCurrentOption,
    selectOne,
    title,
  };
};

export default useNestedDropdown;
