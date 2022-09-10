import { useCallback, useMemo, useState } from 'react';
import { Stack, stackPeak, stackPop, stackPush } from '../../Library/dataStructures';
import { debugFactory } from '../../utils/utils';
import { NestedOption, Option, Value } from '../Library/types';

const debug = debugFactory('useNestedOptions');

type HookArgs<V extends Value> = {
  options: NestedOption<V>[];
  onChange: (id: V) => void;
  initialIdx?: number;
};

export type StackOption<V extends Value> = Option<V, { hasMore: boolean }>;

export type StackValue<V extends Value> = {
  title?: string;
  options: StackOption<V>[];
};

const useNestedOptions = <V extends Value>({ options, onChange, initialIdx = -1 }: HookArgs<V>) => {
  const [optIdx, setOptIdx] = useState<number>(initialIdx);

  const [optionStack, setOptionStack] = useState<Stack<StackValue<V>>>([
    optionsToStackValue(options),
  ]);

  const { options: currOptions, title: currTitle } =
    useMemo(() => stackPeak(optionStack), [optionStack]) ?? {};

  const reset = useCallback(() => {
    setOptionStack([optionsToStackValue(options)]);
    setOptIdx(initialIdx);
  }, [setOptionStack, setOptIdx, initialIdx, options]);

  const selectOne = useCallback(
    (opt: StackOption<V>) => {
      const { hasMore } = opt.data;
      if (!hasMore) return onChange(opt.id);
      /* if has more push the next options on the stack */
      const subOptions = options.find(o => o.id === opt.id)?.subcategories ?? [];
      const nextStackValue = optionsToStackValue(subOptions, opt.label);
      setOptionStack(prevStack => stackPush(prevStack, nextStackValue));
      setOptIdx(initialIdx);
    },
    [setOptionStack, options, initialIdx, onChange]
  );

  const goToPrevCategory = useCallback(() => {
    setOptionStack(prevStack => {
      if (prevStack.length <= 1) return prevStack;
      const [poppedStack] = stackPop(prevStack);
      return poppedStack;
    });
    setOptIdx(initialIdx);
  }, [setOptionStack, setOptIdx, initialIdx]);

  const canGoToPrevCategory = optionStack.length > 1;

  const moveOptionIdx = useCallback(
    (direction: -1 | 1) => {
      debug(`moveOptionIdx(direction: ${direction})`);
      const upperBound = (currOptions ?? []).length - 1;
      const lowerBound = 0;
      setOptIdx(prevIdx => {
        const newIdx = direction + prevIdx;
        if (newIdx < lowerBound) return upperBound;
        if (newIdx > upperBound) return lowerBound;
        // clamp
        return Math.min(Math.max(newIdx, lowerBound), upperBound);
      });
    },
    [setOptIdx, currOptions]
  );

  return {
    currentOptions: currOptions ?? [],
    title: currTitle,
    canGoToPrevCategory,
    optIdx,
    selectOne,
    goToPrevCategory,
    moveOptionIdx,
    reset,
  };
};

const optionsToStackValue = <V extends Value>(
  options: NestedOption<V>[],
  title?: string
): StackValue<V> => {
  return {
    title,
    options: options.map(o => ({
      id: o.id,
      label: o.label,
      data: { hasMore: !!o.subcategories },
    })),
  };
};

export default useNestedOptions;
