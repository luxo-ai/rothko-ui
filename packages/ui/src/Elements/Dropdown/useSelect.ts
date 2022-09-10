import { flatCompact } from '@aemiko/utils';
import { Set } from 'immutable';
import isFunction from 'lodash/isFunction';
import isNil from 'lodash/isNil';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { debugFactory } from '../../utils/utils';
import { Option, Value } from '../Library/types';
import useOptions from '../Library/useOptions';
import { QueryMatchFn } from './types';

const debug = debugFactory('useSelect');

type HookArgs<V, T> = {
  options: Option<V, T>[];
  onChange: (v: V | V[] | null) => void;
  value?: V | V[] | null;
  multiple?: boolean;
  search?: boolean | QueryMatchFn<V, T>;
  openReverse?: boolean;
  onDelete?: (v: V) => void;
};

const useSelect = <V extends Value, T = undefined>(args: HookArgs<V, T>) => {
  const { value, multiple, search, onChange, onDelete } = args;

  const { options, optIdx, moveOptionIdx, resetOptionIdx, setOptions } = useOptions({
    reverse: args.openReverse,
    options: args.options,
  });

  const [query, setQueryInner] = useState<string | null>(null);
  // important to useMemo here because otherwise the useEffect below will go into
  // an infinite loop...
  const selectedValues = useMemo(() => Set(flatCompact(value)), [value]);

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
      debug('deleteOne');
      const newValue = multiple ? [...selectedValues].filter(v => v !== toDelete) : null;
      onChange(newValue);
      onDelete?.(toDelete);
    },
    [onChange, onDelete, multiple, selectedValues, args.options]
  );

  const optionLookup = useMemo(
    () => args.options.reduce((acc, o) => ({ ...acc, [o.id]: o }), {} as Record<V, Option<V, T>>),
    [args.options]
  );

  useEffect(() => {
    if (!search || !query) return;
    setOptions(args.options.filter(o => matchesQuery(o)));
  }, [search, query, matchesQuery, setOptions, args.options]);

  useEffect(() => {
    if (!multiple) return;
    setOptions(
      args.options.filter(o => !selectedValues.has(o.id)),
      { resetIdx: false }
    );
  }, [selectedValues, multiple, setOptions, args.options]);

  return {
    query,
    optIdx,
    optionLookup,
    options,
    setQuery,
    selectOne,
    deleteOne,
    moveOptionIdx,
    reset: resetOptionIdx,
  };
};

const defaultQueryMatcher = <V extends Value, T = undefined>(
  query: string,
  option: Option<V, T>
) => {
  return option.label.toLowerCase().includes(query.toLowerCase());
};

export default useSelect;
