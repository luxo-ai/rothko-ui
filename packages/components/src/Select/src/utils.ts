import type { NestedOption, Option, Value } from '@rothko-ui/system';

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

export function findOptionMatch2<V, T = undefined>(
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
