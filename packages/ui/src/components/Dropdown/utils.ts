import type { NestedOption, Option, Value } from '../../library/types';
import type { StackValue } from './types';

export function findPathToOptionMatch<V extends Value>(
  value: V,
  options: NestedOption<V>[]
): Option<V>[] {
  for (const option of options) {
    const { subcategories } = option;
    // match found at root
    if (option.id === value) {
      return [option];
    }
    if (subcategories) {
      const subPath = findPathToOptionMatch(value, subcategories);
      if (subPath.length) return [option, ...subPath];
    }
  }
  return [];
}

export function optionsToStackValue<V extends Value>(
  options: NestedOption<V>[],
  title?: string
): StackValue<V> {
  return {
    title,
    options: options.map(o => ({
      id: o.id,
      label: o.label,
      data: { hasMore: !!o.subcategories },
    })),
  };
}
