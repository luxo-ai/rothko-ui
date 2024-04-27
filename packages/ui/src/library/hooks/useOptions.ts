import { useCallback, useState } from 'react';

import { useDebuggerContext } from '../DebuggerContext';
import type { Option } from '../types';
import { INITIAL_OPTION_IDX } from './constants';
import type { Direction } from './types';
import { dial } from './utils';

const useOptions = <V, T>(initialOptions: Option<V, T>[]) => {
  const debug = useDebuggerContext('useOptions');

  const [optIdx, setOptIdx] = useState<number>(INITIAL_OPTION_IDX);
  const [options, setOptionsInner] = useState<Option<V, T>[]>(initialOptions);

  const moveOptionIdx = useCallback(
    (direction: Direction) => {
      debug(`moveOptionIdx(direction: ${direction})`);
      if (options.length <= 0) return;
      // rotate through the indexes
      const upperBound = options.length - 1;
      setOptIdx(prevIdx => dial[direction](prevIdx, upperBound));
    },
    [setOptIdx, options.length, debug]
  );

  const resetOptionIdx = useCallback(() => {
    setOptIdx(INITIAL_OPTION_IDX);
  }, [setOptIdx]);

  const setOptions = useCallback(
    (opts: Option<V, T>[], { resetIdx = true }: { resetIdx?: boolean } = {}) => {
      debug(`setOptions`);
      setOptionsInner(opts);
      // just make option index the same unless greater than then just take the max?
      if (resetIdx) resetOptionIdx();
    },
    [setOptionsInner, resetOptionIdx, debug]
  );

  return {
    optIdx,
    options,
    moveOptionIdx,
    resetOptionIdx,
    setOptions,
  };
};

export default useOptions;
