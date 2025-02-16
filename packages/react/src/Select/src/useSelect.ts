import { asNonNilArray, filterIterable, isNil, debugFactory, useOptions } from '@rothko-ui/system';
import type { FocusHandler, Option, Value } from '@rothko-ui/system';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type HookArgs<V, T> = {
  disabled?: boolean;
  multiple?: boolean;
  onChange: (v: V | V[] | null) => void;
  onClear?: () => void;
  onDelete?: (v: V) => void;
  onFocus?: FocusHandler;
  onBlur?: FocusHandler;
  onOpen?: () => void;
  onClose?: () => void;
  options: Option<V, T>[];
  value?: V | V[] | null;
};

const useSelect = <V extends Value, T = undefined>({
  multiple,
  onChange,
  onDelete,
  onBlur,
  onFocus,
  onOpen,
  onClose,
  onClear,
  value,
  disabled,
  options: opts,
}: HookArgs<V, T>) => {
  const debug = debugFactory('useSelect');

  const timeoutId = useRef<NodeJS.Timeout>();
  const containerRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState<boolean>(false);
  const [focus, setFocus] = useState<boolean>(false);

  const { optIdx, moveOptionIdx, options, resetOptionIdx, setOptions } = useOptions(opts);

  // important to useMemo here because otherwise the useEffect below will go into
  // an infinite loop...
  const selectedValuesLookup = useMemo(() => new Set(asNonNilArray(value)), [value]);

  const closeMenu = () => {
    if (!open) return;
    debug('closeMenu');
    setOpen(false);
    setFocus(false);
    onClose?.();
    containerRef.current?.blur();
    //   menuRef.current?.blur();
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
    (selectedOpt: Option<V, T>) => {
      if (disabled) return;
      debug('selectOne');
      const selectedId: V = selectedOpt.id;
      onChange(multiple ? [...selectedValuesLookup, selectedId] : selectedId);
    },
    [selectedValuesLookup, multiple, disabled, onChange, debug]
  );

  const deleteOne = useCallback(
    (toDelete: V) => {
      if (disabled) return;
      debug('deleteOne');
      onChange(multiple ? filterIterable(selectedValuesLookup, v => v !== toDelete) : null);
      onDelete?.(toDelete);
    },
    [onChange, onDelete, multiple, selectedValuesLookup, disabled, debug]
  );

  const optionLookup = useMemo(
    () => opts.reduce((acc, o) => ({ ...acc, [o.id]: o }), {} as Record<V, Option<V, T>>),
    [opts]
  );

  // can cause problems ....
  useEffect(() => {
    if (!multiple) return;
    setOptions(
      opts.filter(opt => !selectedValuesLookup.has(opt.id)),
      {
        resetIdx: false,
      }
    );
  }, [multiple, selectedValuesLookup, opts, setOptions]);

  return {
    deleteOne,
    moveOptionIdx,
    optIdx,
    optionLookup,
    options,
    selectOne,
    containerRef,
    open,
    focus,
    onBlurHandler,
    onFocusHandler,
    closeMenu,
    openMenu,
    clearValue,
  };
};

export default useSelect;
