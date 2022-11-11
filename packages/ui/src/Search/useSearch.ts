import debounce from 'lodash/debounce';
import identityFn from 'lodash/identity';
import { useCallback, useEffect, useState } from 'react';
import { useLRUCache } from '../Library/Hooks/useCache';
import type { Option } from '../Library/types';
import useOptions from '../Library/Hooks/useOptions';

export type OptionFetcher<V, T = undefined> = (query: string) => Promise<Option<V, T>[]>;

export type HookProperties<V, T = undefined> = {
  dataFetcher?: OptionFetcher<V, T>;
  limit?: number;
};

export function useSearch<V, T = undefined>({
  dataFetcher,
  limit = Infinity,
}: HookProperties<V, T>) {
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState<string | null>(null);
  const { options, setOptions, moveOptionIdx, optIdx } = useOptions<V, T>({ options: [] });

  const cachedFetch = useLRUCache({ dataFetcher, keyGenerator: identityFn });

  const onSetQuery = useCallback(
    debounce(async (query: string) => {
      if (!query || query.length < 2) return;
      try {
        setLoading(true);
        const options = await cachedFetch(query);
        if (options) {
          setOptions(options.length > limit ? options.slice(0, limit) : options);
        }
      } catch (e) {
        setError(e);
        throw e;
      } finally {
        setLoading(false);
      }
    }, 250),
    [setOptions, setError, setLoading, options]
  );

  useEffect(() => {
    if (!query) return;
    onSetQuery(query);
  }, [query]);

  return { loading, options, error, setQuery, query, moveOptionIdx, optIdx };
}
