import React, { useCallback, useState } from 'react';
import { debugFactory } from '../../utils/utils';
import { Option } from '../types';

const debug = debugFactory('useOptions');

type HookArgs<V, T> = {
  options: Option<V, T>[];
  reverse?: boolean;
  initialIdx?: number;
};

const useOptions = <V, T>({ initialIdx = -1, reverse, options: optionsRaw }: HookArgs<V, T>) => {
  const [optIdx, setOptIdx] = useState<number>(initialIdx);

  const [options, setOptionsInner] = useState<Option<V, T>[]>(
    reverse ? reverseOptions(optionsRaw) : optionsRaw
  );

  const moveOptionIdx = useCallback(
    (direction: -1 | 1) => {
      debug(`moveOptionIdx(direction: ${direction})`);
      const upperBound = options.length - 1;
      const lowerBound = 0;
      // rotate through the indexes
      setOptIdx(prevIdx => {
        const newIdx = direction + prevIdx;
        if (newIdx < lowerBound) return upperBound;
        if (newIdx > upperBound) return lowerBound;
        return Math.min(Math.max(newIdx, lowerBound), upperBound);
      });
    },
    [setOptIdx, options]
  );

  const resetOptionIdx = useCallback(() => {
    setOptIdx(initialIdx);
  }, [setOptIdx, initialIdx]);

  const setOptions = useCallback(
    (
      opts: React.SetStateAction<Option<V, T>[]>,
      { resetIdx = true }: { resetIdx?: boolean } = {}
    ) => {
      debug(`setOptions`);
      // this isn't nice, find a better way later
      if (typeof opts === 'function') {
        setOptionsInner(opts);
      } else {
        setOptionsInner(reverse ? reverseOptions(opts) : opts);
      }
      if (resetIdx) setOptIdx(initialIdx);
    },
    [setOptionsInner, setOptIdx, initialIdx, reverse]
  );

  return {
    optIdx,
    options,
    moveOptionIdx,
    resetOptionIdx,
    setOptions,
  };
};

const reverseOptions = <V, T>(options: Option<V, T>[]) => {
  const result: Option<V, T>[] = [];
  for (let i = options.length - 1; i >= 0; i--) {
    result.push(options[i]);
  }
  return result;
};

export default useOptions;
