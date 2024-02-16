/* eslint-disable @typescript-eslint/no-explicit-any */
import { Map as ImmutableMap } from 'immutable';
import { useCallback, useRef } from 'react';
import { useDebuggerContext } from '../DebuggerContext';
import useInterval from './useInterval';

const ONE_MS = 1000;
const EXPIRES_SECONDS_DEFAULT = 5 * 60; // 5 min
const VACUUM_DELAY_SECONDS_DEFAULT = 2 * 60; // 2 min
const CACHE_MAX_DEFAULT = 10;

type DataFecher<T, Arg = undefined> = (arg: Arg) => Promise<T> | T;
type Metadata = { lastFetchedAt: number };
type CacheValue<T> = { data: T; metadata: Metadata };
type Cache<T> = ImmutableMap<string, CacheValue<T>>;

type HookArgs<T, Arg = undefined> = {
  dataFetcher?: DataFecher<T, Arg>;
  keyGenerator: (a: Arg) => string;
  cacheMax?: number;
  expiresSeconds?: number;
  vacuumDelaySeconds?: number;
};

/* Cache using LRU (least recently used) policy */
export const useLRUCache = <T, Arg = undefined>({
  dataFetcher,
  keyGenerator,
  cacheMax = CACHE_MAX_DEFAULT,
  expiresSeconds = EXPIRES_SECONDS_DEFAULT,
  vacuumDelaySeconds = VACUUM_DELAY_SECONDS_DEFAULT,
}: HookArgs<T, Arg>) => {
  const debug = useDebuggerContext('useLRUCache');
  /* contains meta data on values in cache */
  const cache = useRef<Cache<T>>(ImmutableMap());

  /* on interval run a vaccum to see if values are expired */
  useInterval(() => {
    const currCache = cache.current;

    const expiredKeys = [...currCache.entries()].reduce((acc, [key, value]) => {
      const { lastFetchedAt } = value.metadata;
      const isValueExpired = Date.now() - lastFetchedAt > expiresSeconds * ONE_MS;
      return isValueExpired ? [...acc, key] : acc;
    }, [] as string[]);

    debug('Vacuuming keys', expiredKeys as any);
    cache.current = currCache.removeAll(expiredKeys);
  }, vacuumDelaySeconds * ONE_MS);

  const fetchWithCache = useCallback(
    async (a: Arg): Promise<T | null> => {
      const metadata: Metadata = {
        lastFetchedAt: Date.now(),
      };
      const key = keyGenerator(a);
      const cacheValue = cache.current.get(key);
      if (cacheValue) {
        debug('Fetching from cache w args:', JSON.stringify(a), 'Metadata', metadata);
        cache.current = cache.current.set(key, { ...cacheValue, metadata });
        return cacheValue.data;
      }

      debug('Fetching raw value w args', JSON.stringify(a));
      const data = dataFetcher ? await dataFetcher(a) : null;
      const maxSizeMet = cache.current.size >= cacheMax;

      if (maxSizeMet && data) {
        debug('Max size met, evicting least used');
        const newCache = evictLeastUsed(cache.current);
        cache.current = newCache.set(key, { data, metadata });
      } else if (data) {
        cache.current = cache.current.set(key, { data, metadata });
      }

      return data;
    },
    [dataFetcher, keyGenerator, cache]
  );

  return fetchWithCache;
};

const evictLeastUsed = <T>(cache: Cache<T>) => {
  let LRUKey = '';
  for (const [k, v] of cache) {
    const { lastFetchedAt } = v.metadata;
    const currLastUsed = cache.get(LRUKey)?.metadata?.lastFetchedAt;
    const isLeastUsed = !currLastUsed || currLastUsed > lastFetchedAt;
    if (isLeastUsed) {
      LRUKey = k;
    }
  }
  return cache.remove(LRUKey);
};
