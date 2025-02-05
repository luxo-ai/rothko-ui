import { debounce, isNil, debugFactory, useOptions } from '@rothko-ui/system';
import { useCallback, useMemo, useRef, useState } from 'react';

import type { QueryMatchFn } from './types';
import type { FocusHandler, Option, Value } from '@rothko-ui/system';

const DEBOUNCE_MS = 200;

type HookArgs<V, T> = {
  disabled?: boolean;
  onBlur?: FocusHandler;
  onChange: (v: V | null) => void;
  onClear?: () => void;
  onFocus?: FocusHandler;
  onOpen?: () => void;
  onClose?: () => void;
  options: Option<V, T>[];
  searchFn?: QueryMatchFn<V, T>;
  value?: V | null;
};

const useAutocomplete = <V extends Value, T = undefined>({
  disabled,
  onBlur,
  onChange,
  onClear,
  onFocus,
  onOpen,
  onClose,
  options: opts,
  searchFn = defaultQueryMatcher,
  value,
}: HookArgs<V, T>) => {
  const debug = debugFactory('useAutocomplete');

  const timeoutId = useRef<NodeJS.Timeout>();
  const containerRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState<boolean>(false);
  const [focus, setFocus] = useState<boolean>(false);
  const [query, setQueryInner] = useState<string>('');

  const selectedOption = useMemo(
    () => (!isNil(value) ? opts.find(o => o.id === value) : null),
    [opts, value]
  );

  const { optIdx, moveOptionIdx, options, resetOptionIdx, setOptions } = useOptions(opts);

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
    setQueryInner('');
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
          setQueryInner(selectedOption?.label || '');
          setOptions(opts);
        }
      }, 0);
    },
    [
      onBlur,
      setFocus,
      setOpen,
      onClose,
      timeoutId,
      debug,
      setQueryInner,
      opts,
      setOptions,
      selectedOption,
    ]
  );

  // intellegently match if no options except one?
  const setQuery = useCallback(
    (newQuery: string) => {
      setQueryInner(newQuery);
      debounce(() => {
        setOptions(newQuery ? opts.filter(opt => searchFn(newQuery, opt)) : opts);
      }, DEBOUNCE_MS)();
    },
    [setQueryInner, setOptions, searchFn, opts]
  );

  const selectOne = useCallback(
    (selectedOpt: Option<V, T>) => {
      if (disabled) return;
      debug('selectOne');
      onChange(selectedOpt.id);
      setQueryInner(selectedOpt.label);
      setOptions(opts);
    },
    [onChange, setQueryInner, disabled, setOptions, debug, opts]
  );

  return {
    clearValue,
    moveOptionIdx,
    optIdx,
    selectedOption,
    options,
    query,
    // probably don't need this in the select either
    selectOne,
    setQuery,
    containerRef,
    open,
    focus,
    onBlurHandler,
    onFocusHandler,
    closeMenu,
    openMenu,
  };
};

const defaultQueryMatcher = <V extends Value, T = undefined>(
  query: string,
  option: Option<V, T>
) => {
  return option.label.toLowerCase().includes(query.toLowerCase());
};

export default useAutocomplete;
