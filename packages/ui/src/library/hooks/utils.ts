import { INITIAL_OPTION_IDX } from './constants';
import type { StackOption } from './types';
import { Direction } from './types';
import type { NestedOption, Option, Value } from '../types';

export function findPathToOptionMatch<V extends Value, T = undefined>(
  value: V,
  options: NestedOption<V, T>[]
): Option<V, T>[] {
  for (const option of options) {
    // match found at root
    if (option.id === value) {
      return [option];
    }
    if ('options' in option && option.options) {
      const subPath = findPathToOptionMatch(value, option.options);
      if (subPath.length) return [option, ...subPath];
    }
  }
  return [];
}

export function findOptionMatch<V extends Value, T = undefined>(
  value: V,
  options: NestedOption<V, T>[]
): NestedOption<V, T> | null {
  for (const option of options) {
    if (option.id === value) {
      return option;
    }
    if ('options' in option && option.options) {
      const subMatch = findOptionMatch(value, option.options);
      if (subMatch) return subMatch;
    }
  }
  return null;
}

export function findOptionMatch2<V, T>(
  value: V,
  options: NestedOption<V, T>[],
  targetDepth: number
): NestedOption<V, T> | null {
  // DFS search for an option that matches the value at the target depth
  function findOptionMatchWithDepthHeuristic<V, T = undefined>(
    value: V,
    options: NestedOption<V, T>[],
    currentDepth: number
  ): NestedOption<V, T> | null {
    if (currentDepth > targetDepth) {
      return null; // Stop searching beyond the known depth
    }

    for (const option of options) {
      if (option.id === value) {
        return option;
      }
      if (option.options) {
        const result = findOptionMatchWithDepthHeuristic(value, option.options, currentDepth + 1);
        if (result) return result;
      }
    }

    return null;
  }

  return findOptionMatchWithDepthHeuristic(value, options, 0);
}

export function createStackOptions<V, T>(o: NestedOption<V, T>[]): StackOption<V, T>[] {
  return o.map(({ options, ...rest }) => ({
    ...rest,
    hasMore: Boolean(options),
  }));
}

const incrementDial = (val: number, max: number) => {
  if (val === INITIAL_OPTION_IDX) return 0;
  return (val + Direction.INCR) % (max + 1);
};

const decrementDial = (val: number, max: number) => {
  if (val === INITIAL_OPTION_IDX) return max;
  return (val + Direction.DECR + (max + 1)) % (max + 1);
};

export const dial: Record<Direction, (val: number, max: number) => number> = {
  [Direction.INCR]: incrementDial,
  [Direction.DECR]: decrementDial,
};
