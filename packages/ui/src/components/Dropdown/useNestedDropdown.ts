import { useCallback, useMemo, useRef, useState } from 'react';

import { isEmpty, isNil } from '@rothko-ui/utils';

import { useDebuggerContext } from '../../library/DebuggerContext';
import type { Stack } from '../../library/dataStructures';
import { stackPeak, stackPop, stackPush } from '../../library/dataStructures';
import type { FocusHandler, NestedOption, Value } from '../../library/types';
import { Direction } from '../../library/hooks/types';
import useScrollIntoView from '../../library/hooks/useScrollIntoView';
import { findPathToOptionMatch, optionsToStackValue } from './utils';
import type { StackOption, StackValue } from './types';

const INITIAL_IDX = -1;

// like useOptions but for nested options
const useNestedOptions = <V extends Value>(initialOptions: NestedOption<V>[]) => {
  const debug = useDebuggerContext('useNestedOptions');

  const [optIdx, setOptIdx] = useState<number>(INITIAL_IDX);
  const [optionStack, setOptionStack] = useState<Stack<StackValue<V>>>([
    optionsToStackValue(initialOptions),
  ]);

  const { options = [], title } = useMemo(() => stackPeak(optionStack), [optionStack]) ?? {};

  const resetOptionIdx = useCallback(
    ({ resetStack = true }: { resetStack?: boolean } = {}) => {
      if (resetStack) {
        setOptionStack([optionsToStackValue(initialOptions)]);
      }
      setOptIdx(INITIAL_IDX);
    },
    [setOptionStack, setOptIdx, initialOptions]
  );

  const goToPrevCategory = useCallback(() => {
    setOptionStack(prevStack => {
      if (prevStack.length <= 1) {
        return prevStack;
      }
      const [poppedStack] = stackPop(prevStack);
      return poppedStack;
    });
    setOptIdx(INITIAL_IDX);
  }, [setOptionStack, setOptIdx]);

  const canGoToPrevCategory = optionStack.length > 1;

  const moveOptionIdx = useCallback(
    (direction: Direction) => {
      debug(`moveOptionIdx(direction: ${direction})`);
      if (isEmpty(options)) return;

      // rotate through the indexes
      const upperBound = options.length - 1;
      setOptIdx(prevIdx => {
        return direction === Direction.INCR
          ? incrementDial(prevIdx, upperBound)
          : decrementDial(prevIdx, upperBound);
      });
    },
    [setOptIdx, options, debug]
  );

  return {
    title,
    canGoToPrevCategory,
    goToPrevCategory,
    // same as useOptions
    options,
    optIdx,
    moveOptionIdx,
    resetOptionIdx,
    setOptionStack,
  };
};

type HookArgs<V extends Value> = {
  options: NestedOption<V>[];
  onChange: (id: V | null) => void;
  onFocus?: FocusHandler;
  onBlur?: FocusHandler;
  onOpen?: () => void;
  onClose?: () => void;
  onClear?: () => void;
  disabled?: boolean;
  value?: V | null;
};

const useNestedDropdown = <V extends Value>({
  options: initialOptions,
  onChange,
  onFocus,
  onBlur,
  onOpen,
  onClear,
  onClose,
  disabled,
  value,
}: HookArgs<V>) => {
  const debug = useDebuggerContext('useNestedDropdown');

  const timeoutId = useRef<NodeJS.Timeout>();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollIntoView, scrollElRef: menuRef } = useScrollIntoView();

  const [open, setOpen] = useState<boolean>(false);
  const [focus, setFocus] = useState<boolean>(false);

  const {
    title,
    canGoToPrevCategory,
    goToPrevCategory,
    options,
    optIdx,
    moveOptionIdx,
    resetOptionIdx,
    setOptionStack,
  } = useNestedOptions(initialOptions);

  const closeMenu = () => {
    if (!open) return;
    debug('closeMenu');
    setOpen(false);
    setFocus(false);
    onClose?.();
    containerRef.current?.blur();
    menuRef.current?.blur();
  };

  const openMenu = () => {
    if (open || disabled) return;
    debug('openMenu');
    if (isNil(value)) {
      // i think this will be problematic if the options are not the same as the original options
      // also maybe the useOptions should be responsible for this? Also wait
      // useOptions should be reseting this on setOptions....No?
      // maybe we want to maintain it then. Like set the option index for a value.
      // setOptionIndexFor(value)...
      resetOptionIdx();
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
    (selectedOpt: StackOption<V>) => {
      debug('selectOne');
      const { hasMore } = selectedOpt.data;
      if (!hasMore) {
        onChange(selectedOpt.id);
        resetOptionIdx();
        return;
      }
      /* if has more push the next options on the stack */
      const subOptions = initialOptions.find(o => o.id === selectedOpt.id)?.subcategories || [];
      const nextStackValue = optionsToStackValue(subOptions, selectedOpt.label);
      setOptionStack(prevStack => stackPush(prevStack, nextStackValue));
      resetOptionIdx({ resetStack: false });
    },
    [setOptionStack, onChange, resetOptionIdx, initialOptions, debug]
  );

  const pathToCurrentOption = useMemo(
    () => (!isNil(value) ? findPathToOptionMatch(value, initialOptions) : []),
    [value, initialOptions]
  );

  return {
    moveOptionIdx,
    optIdx,
    options,
    selectOne,
    containerRef,
    menuRef,
    open,
    focus,
    onBlurHandler,
    onFocusHandler,
    closeMenu,
    openMenu,
    scrollIntoView,
    clearValue,
    title,
    canGoToPrevCategory,
    goToPrevCategory,
    pathToCurrentOption,
  };
};

const incrementDial = (val: number, max: number) => {
  if (val === INITIAL_IDX) return 0;
  return (val + Direction.INCR) % (max + 1);
};

const decrementDial = (val: number, max: number) => {
  if (val === INITIAL_IDX) return max;
  return (val + Direction.DECR + (max + 1)) % (max + 1);
};

export default useNestedDropdown;
