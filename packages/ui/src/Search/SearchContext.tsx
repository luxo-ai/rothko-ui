import type { Nullable } from '@rothko-ui/utils';
import React, { createContext, useContext } from 'react';
import type { Option } from '../Library/types';

type ISearchContext<V, T = undefined> = {
  error?: Nullable<string>;
  loading?: boolean;
  moveOptionIdx: (d: -1 | 1) => void;
  optIdx: number;
  options: Option<V, T>[];
  query?: Nullable<string>;
  setQuery: (q: string) => void;
};

const SearchContext = createContext<ISearchContext<any, any> | null>(null);

export const useSearchContext = () => {
  const ctx = useContext(SearchContext);
  if (!ctx) {
    throw new Error('calling "useSearchContext" outside of context');
  }
  return ctx;
};
