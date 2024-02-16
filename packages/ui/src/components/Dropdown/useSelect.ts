import { asCompactedArray, isFunction, isNil } from '@rothko-ui/utils';
import { Set as ImSet } from 'immutable';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDebuggerContext } from '../../library/DebuggerContext';
import useOptions from '../../library/Hooks/useOptions';
import type { Option, Value } from '../../library/types';
import type { QueryMatchFn } from './types';

type HookArgs<V, T> = {
  options: Option<V, T>[];
  onChange: (v: V | V[] | null) => void;
  value?: V | V[] | null;
  multiple?: boolean;
  disabled?: boolean;
  search?: boolean | QueryMatchFn<V, T>;
  openReverse?: boolean;
  onDelete?: (v: V) => void;
};

const useSelect = <V extends Value, T = undefined>(args: HookArgs<V, T>) => {
  const debug = useDebuggerContext('useSelect');
  const { multiple, onChange, onDelete, search, value, disabled } = args;

  const { optIdx, moveOptionIdx, options, resetOptionIdx, setOptions } = useOptions({
    reverse: args.openReverse,
    options: args.options,
  });

  const [query, setQueryInner] = useState<string | null>(null);
  // important to useMemo here because otherwise the useEffect below will go into
  // an infinite loop...
  const selectedValues = useMemo(() => ImSet(asCompactedArray(value)), [value]);

  const matchesQuery = useCallback(
    (o: Option<V, T>) => {
      if (!search || !query) return true;
      return isFunction(search) ? search(query, o) : defaultQueryMatcher(query, o);
    },
    [search, query]
  );

  const setQuery = useCallback(
    (q: string) => {
      setQueryInner(q);
      resetOptionIdx();
    },
    [setQueryInner, resetOptionIdx]
  );

  const selectOne = useCallback(
    (selected: V | null) => {
      if (isNil(selected)) {
        return onChange(null);
      }
      debug('selectOne');
      const newValue = multiple ? [...selectedValues, selected] : selected;
      onChange(newValue);
      setQueryInner(null);
    },
    [selectedValues, multiple, onChange, setQueryInner, resetOptionIdx, setOptions]
  );

  const deleteOne = useCallback(
    (toDelete: V) => {
      if (disabled) return;
      debug('deleteOne');
      const newValue = multiple ? [...selectedValues].filter(v => v !== toDelete) : null;
      onChange(newValue);
      onDelete?.(toDelete);
    },
    [onChange, onDelete, multiple, selectedValues, args.options, disabled]
  );

  const optionLookup = useMemo(
    () => args.options.reduce((acc, o) => ({ ...acc, [o.id]: o }), {} as Record<V, Option<V, T>>),
    [args.options]
  );

  useEffect(() => {
    if (!search) return;
    if (query) {
      setOptions(args.options.filter(o => matchesQuery(o)));
    } else if (!query && args.options.length > options.length) {
      // reset options
      setOptions(args.options);
    }
    // careful. addting options to the dependency array causes an infinite loop
  }, [search, query, matchesQuery, setOptions, args.options]);

  useEffect(() => {
    if (!multiple) return;
    setOptions(
      args.options.filter(o => !selectedValues.has(o.id)),
      { resetIdx: false }
    );
  }, [selectedValues, multiple, setOptions, args.options]);

  return {
    deleteOne,
    moveOptionIdx,
    optIdx,
    optionLookup,
    options,
    query,
    reset: resetOptionIdx,
    selectOne,
    setQuery,
  };
};

const defaultQueryMatcher = <V extends Value, T = undefined>(
  query: string,
  option: Option<V, T>
) => {
  return option.label.toLowerCase().includes(query.toLowerCase());
};

export default useSelect;
