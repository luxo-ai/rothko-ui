import { useCallback, useState } from 'react';
import { useDebuggerContext } from '../DebuggerContext';
import type { Option } from '../types';
import { isEmpty } from '@rothko-ui/utils';
import { Direction } from './types';

const INITIAL_IDX = -1;

const useOptions = <V, T>(initialOptions: Option<V, T>[]) => {
  const debug = useDebuggerContext('useOptions');
  const [optIdx, setOptIdx] = useState<number>(INITIAL_IDX);
  const [options, setOptionsInner] = useState<Option<V, T>[]>(initialOptions);

  const moveOptionIdx = useCallback(
    (direction: Direction) => {
      debug(`moveOptionIdx(direction: ${direction})`);
      if (isEmpty(options)) return;

      // rotate through the indexes
      const upperBound = options.length - 1;
      setOptIdx(prevIdx => {
        return direction === Direction.INCR
          ? incrementDial(prevIdx, upperBound)
          : decrementDial(prevIdx, upperBound);
      });
    },
    [setOptIdx, options, debug]
  );

  const resetOptionIdx = useCallback(() => {
    setOptIdx(INITIAL_IDX);
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

const incrementDial = (val: number, max: number) => {
  if (val === INITIAL_IDX) return 0;
  return (val + Direction.INCR) % (max + 1);
};

const decrementDial = (val: number, max: number) => {
  if (val === INITIAL_IDX) return max;
  return (val + Direction.DECR + (max + 1)) % (max + 1);
};

export default useOptions;
