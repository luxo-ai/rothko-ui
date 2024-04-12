import { debounce, identity } from '@rothko-ui/utils';
import { useEffect, useMemo, useState } from 'react';
import { useLRUCache } from '../../library/hooks/useCache';
import useOptions from '../../library/hooks/useOptions';
import type { Option } from '../../library/types';

const DEBOUNCE_WAIT_MS = 250;

export type OptionFetcher<V, T = undefined> = (
  query: string
) => Promise<Option<V, T>[]> | Option<V, T>[];

type HookProperties<V, T = undefined> = {
  dataFetcher?: OptionFetcher<V, T>;
  initialQuery?: string;
  limit?: number;
};

export function useSearch<V, T = undefined>({
  dataFetcher,
  initialQuery,
  limit = Infinity,
}: HookProperties<V, T>) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState<string | null>(initialQuery || null);
  const { options, setOptions, moveOptionIdx, optIdx } = useOptions<V, T>({ options: [] });

  const cachedFetch = useLRUCache({ dataFetcher, keyGenerator: identity });

  const onSetQuery = useMemo(
    () =>
      debounce(async (query: string) => {
        if (!query || query.length < 2) return;
        try {
          setLoading(true);
          const options = await cachedFetch(query);
          if (options) {
            setOptions(options.length > limit ? options.slice(0, limit) : options);
          }
        } catch (e) {
          setError(String(e));
          throw e;
        } finally {
          setLoading(false);
        }
      }, DEBOUNCE_WAIT_MS),
    [setOptions, setError, setLoading, limit, cachedFetch]
  );

  useEffect(() => {
    if (!query) return;
    onSetQuery(query);
  }, [query, onSetQuery]);

  return { loading, options, error, setQuery, query, moveOptionIdx, optIdx };
}
