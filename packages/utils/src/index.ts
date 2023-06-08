import capitalize from 'lodash/capitalize';
import compact from 'lodash/compact';
import flatten from 'lodash/flatten';
import type { Nullable } from './types';

export * from './hooks';
export type {
  DeepPartial,
  Dictionary,
  KeyLike,
  Map,
  NestedRecord,
  Nil,
  Nullable,
  Obj,
  WithData,
  WithKey,
} from './types';

export const kebabToCamelCase = (str: string) => {
  const camelCaps = str
    .split('-')
    .filter(s => s.length)
    .map(capitalize)
    .join();
  return `${camelCaps.slice(0, 1).toLowerCase()}${camelCaps.slice(1)}`;
};

export const flatCompact = <T>(v: Nullable<T> | T[]) => {
  return flatten(compact([v]));
};

/**
 * based on https://www.npmjs.com/package/clsx
 */
type Falsey = number | false | null | undefined;

export const classes = (...args: (string | Falsey | Record<string, string | true | Falsey>)[]) => {
  const strings: string[] = [];

  for (const arg of args) {
    if (typeof arg === 'string') {
      strings.push(arg);
    } else if (typeof arg === 'object' && arg !== null) {
      strings.push(...Object.keys(arg).filter(key => Boolean(arg[key])));
    }
  }

  return strings.join(' ');
};
