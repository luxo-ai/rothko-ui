import { useCallback, useMemo, useState } from 'react';
import { useDebuggerContext } from '../../library/DebuggerContext';
import type { Stack } from '../../library/dataStructures';
import { stackPeak, stackPop, stackPush } from '../../library/dataStructures';
import type { NestedOption, Option, Value } from '../../library/types';

type HookArgs<V extends Value> = {
  options: NestedOption<V>[];
  onChange: (id: V | null) => void;
  initialIdx?: number;
  reverse?: boolean;
};

export type StackOption<V extends Value> = Option<V, { hasMore: boolean }>;

export type StackValue<V extends Value> = {
  title?: string;
  options: StackOption<V>[];
};

const useNestedOptions = <V extends Value>({
  options,
  onChange,
  reverse,
  initialIdx = -1,
}: HookArgs<V>) => {
  const debug = useDebuggerContext('useNestedOptions');
  const [optIdx, setOptIdx] = useState<number>(initialIdx);

  const [optionStack, setOptionStack] = useState<Stack<StackValue<V>>>([
    optionsToStackValue(reverse ? reverseOptions(options) : options),
  ]);

  const { options: currOptions, title: currTitle } =
    useMemo(() => stackPeak(optionStack), [optionStack]) ?? {};

  const reset = useCallback(() => {
    setOptionStack([optionsToStackValue(reverse ? reverseOptions(options) : options)]);
    setOptIdx(initialIdx);
  }, [setOptionStack, setOptIdx, initialIdx, options]);

  const selectOne = useCallback(
    (opt: StackOption<V> | null) => {
      if (opt === null) return onChange(null);
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

const reverseOptions = <V>(options: NestedOption<V>[]) => {
  const result: NestedOption<V>[] = [];
  for (let i = options.length - 1; i >= 0; i--) {
    result.push(options[i]);
  }
  return result;
};

export default useNestedOptions;
