/* eslint-disable @typescript-eslint/no-explicit-any */
import root from './root';
import type { Nil, Nilable, Falsy } from './types';

type Func = (...args: any[]) => any;

type ArrLike<T> = {
  [index: number]: T;
  length: number;
};

const getTag = (value: any) => {
  if (value == null) {
    return value === undefined ? '[object Undefined]' : '[object Null]';
  }
  return Object.prototype.toString.call(value);
};

/**
 * Checks if the given value is an array.
 *
 * @param {any} v The value to check.
 * @returns {boolean} Returns true if the value is an array, else false.
 * @example
 *
 * isArray([])
 * // => true
 */
export const isArray = (v: any): v is any[] => {
  return Array.isArray(v);
};

/**
 * Checks if the given value is a string.
 *
 * @param {any} value The value to check.
 * @returns {boolean} Returns true if the value is a string, else false.
 * @example
 *
 * isString("hello")
 * // => true
 */
export const isString = (value: any): value is string => {
  return (
    typeof value === 'string' ||
    (typeof value === 'object' &&
      value != null &&
      !Array.isArray(value) &&
      getTag(value) == '[object String]')
  );
};

/**
 * Checks if the given value is a function.
 *
 * @param {any} value The value to check.
 * @returns {boolean} Returns true if the value is a function, else false.
 * @example
 *
 * isFunction(() => {})
 * // => true
 */
export const isFunction = (value: any): value is Func => {
  return typeof value === 'function';
};

/**
 * Checks if the given value is `null` or `undefined`.
 *
 * @param {any} value The value to check.
 * @returns {boolean} Returns true if the value is `null` or `undefined`, else false.
 * @example
 *
 * isNil(null)
 * // => true
 */
export const isNil = <T>(value: Nilable<T>): value is Nil => {
  return value == null;
};

/**
 * Checks if a value is defined (not `null` or `undefined`).
 *
 * @param {Nilable<T>} value The value to check.
 * @returns {boolean} Returns true if the value is defined, else false.
 * @typeparam T The type of the value.
 * @example
 *
 * isNotNil(null)
 * // => false
 *
 * isNotNil(undefined)
 * // => false
 *
 * isNotNil('hello')
 * // => true
 */
export const isNotNil = <T>(value: Nilable<T>): value is T => {
  return !isNil(value);
};

/**
 * Checks if the given value is falsy.
 *
 * @param {any} value - The value to check.
 * @returns {boolean} Returns `true` if the value is falsy, else `false`.
 * @typeparam Falsy - Represents all falsy values in JavaScript, including `false`, `0`, `""`, `null`, `undefined`, and `NaN`.
 *
 * @example
 *
 * isFalsy(0)
 * // => true
 *
 * isFalsy("hello")
 * // => false
 *
 * isFalsy(null)
 * // => true
 */
export const isFalsy = (value: any): value is Falsy => {
  return !value;
};

/**
 * Checks if the given value is not falsy (truthy).
 *
 * @param {T | Falsy} value - The value to check.
 * @returns {boolean} Returns `true` if the value is truthy (not falsy), else `false`.
 * @typeparam T - Represents any type.
 * @typeparam Falsy - Represents all falsy values in JavaScript, including `false`, `0`, `""`, `null`, `undefined`, and `NaN`.
 *
 * @example
 *
 * isTruthy(0)
 * // => false
 *
 * isTruthy("hello")
 * // => true
 *
 * isTruthy(null)
 * // => false
 *
 * isTruthy({ key: "value" })
 * // => true
 */
export const isTruthy = <T>(value: T | Falsy): value is T => {
  return !isFalsy(value);
};

/**
 * Checks if the given value is empty.
 *
 * @param {any} v The value to check.
 * @returns {boolean} Returns true if the value is empty, else false.
 * @example
 *
 * isEmpty({})
 * // => true
 */
export const isEmpty = (v: any): boolean => {
  if (v == null) {
    return true;
  }
  if (isArray(v) || typeof v === 'string') {
    return v.length <= 0;
  }
  const tag = getTag(v);
  if (tag == '[object Map]' || tag == '[object Set]') {
    return !v.size;
  }
  for (const key in v) {
    if (v.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
};

/**
 * Converts the first character of `string` to upper case and the remaining
 * to lower case.
 *
 * @param {string} str The string to capitalize.
 * @returns {string} Returns the capitalized string.
 * @example
 *
 * capitalize('rothko-ui')
 * // => 'Rothko-ui'
 */
export const capitalize = (str: string): string => {
  if (typeof str !== 'string') return '';
  if (str === '') return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Converts a kebab-case string to camelCase.
 *
 * @param {string} str The kebab-case string to convert.
 * @returns {string} Returns the camelCase string.
 * @example
 *
 * kebabToCamelCase('rothko-ui-component')
 * // => 'rothkoUiComponent'
 */
export const kebabToCamelCase = (str: string): string => {
  const camelCaps = str
    .split('-')
    .filter(s => s.length)
    .map(capitalize)
    .join('');
  return `${camelCaps.slice(0, 1).toLowerCase()}${camelCaps.slice(1)}`;
};

/**
 * Removes all falsy values from an array.
 *
 * @param {T[]} arr The array to compact.
 * @returns {T[]} Returns the new array of filtered values.
 * @example
 *
 * compact([0, 1, false, '', 'hello'])
 * // => [1, 'hello']
 */
export const compact = <T>(arr: (T | Falsy)[]): T[] => {
  if (!isArray(arr)) return [];
  return arr.filter(isTruthy);
};

/**
 * Ensures the input is an array, compacts it (removes falsy values), and then returns the array.
 * If the input is not already an array, it is first wrapped in one.
 *
 * @param {Nilable<T> | T[]} v The value or array to compact.
 * @returns {T[]} Returns a compacted array.
 * @typeparam T The type of the values.
 * @example
 *
 * asCompactedArray(null)
 * // => []
 *
 * asCompactedArray([1, 2, null, undefined, 3])
 * // => [1, 2, 3]
 *
 * asCompactedArray('hello')
 * // => ['hello']
 */
export const asCompactedArray = <T>(v: Nilable<T> | T[]): T[] => {
  return compact(isArray(v) ? v : [v]);
};

/**
 * Creates a debounced function that delays the invocation of the provided function.
 *
 * @param {Function} func The function to debounce.
 * @param {number} delay The delay in milliseconds.
 * @example
 *
 * const debounced = debounce(() => console.log('Hello'), 300);
 * debounced(); debounced();  // Logs 'Hello' once after 300ms
 */
export const debounce = <T extends Func>(func: T, delay: number) => {
  if (!isFunction(func)) {
    throw new TypeError('Expected a function');
  }
  let timeout: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
};

/**
 * Creates a memoized version of the provided function.
 *
 * @param {Function} func The function to have its output memoized.
 * @example
 *
 * const memoizedAdd = memoize((x, y) => x + y);
 * memoizedAdd(1, 2);  // Calculates and returns 3
 * memoizedAdd(1, 2);  // Returns 3 from cache
 */
export const memoize = <T extends Func>(func: T) => {
  if (!isFunction(func)) {
    throw new TypeError('Expected a function');
  }
  // or use map?
  const cache: { [key: string]: ReturnType<T> } = {};
  return function (this: any, ...args: Parameters<T>): ReturnType<T> {
    const key = JSON.stringify(args);
    if (cache[key]) return cache[key];
    const result = func.apply(this, args);
    cache[key] = result;
    return result;
  } as (...args: Parameters<T>) => ReturnType<T>;
};

/**
 * Returns the last element of an array.
 *
 * @param {T[]} arr The array to query.
 * @returns {T | null} Returns the last element or null if the array is empty.
 * @example
 *
 * last([1, 2, 3])
 * // => 3
 */
export const last = <T>(arr: T[]): T | null => {
  return arr.length <= 0 ? null : arr[arr.length - 1];
};

/**
 * Returns the first element of an array.
 *
 * @param {T[]} arr The array to query.
 * @returns {T | null} Returns the first element or null if the array is empty.
 * @example
 *
 * first([1, 2, 3])
 * // => 1
 */
export const first = <T>(arr: T[]): T | null => {
  return arr.length <= 0 ? null : arr[0];
};

/**
 * Creates an object composed of the object properties not listed in the provided array.
 *
 * @param {T} obj The source object.
 * @param {string[]} keysToOmit The property names to omit from the result.
 * @returns {Omit<T, K>} Returns the new object without omitted properties.
 * @example
 *
 * omit({ a: 1, b: 2, c: 3 }, ['a', 'c'])
 * // => { b: 2 }
 */
export const omit = <T, K extends keyof T>(obj: T, keysToOmit: K[]): Omit<T, K> => {
  let result: Omit<T, K> = { ...obj };
  for (const key of keysToOmit) {
    const { [key]: _, ...rest } = result;
    result = rest as Omit<T, K>;
  }
  return result;
};

/**
 * A function that does nothing.
 *
 * @example
 *
 * noop();
 * // Does nothing
 */
// eslint-disable-next-line @typescript-eslint/no-empty-function
export const noop = () => {};

/**
 * Returns the first argument it receives.
 *
 * @param {T} v The value to return.
 * @returns {T} Returns the input value.
 * @example
 *
 * identity(5)
 * // => 5
 */
export const identity = <T>(v: T): T => {
  return v;
};

/**
 * Converts a string to an integer of the specified radix.
 *
 * @param {string} string The string to convert.
 * @param {number} [radix=10] The base to use for parsing the string.
 * @returns {number} Returns the parsed integer.
 * @example
 *
 * parseInt('100', 2)
 * // => 4
 */
export const parseInt = (string: string, radix = 10): number => {
  return root.parseInt(String(string).trim(), radix);
};

/**
 * Calls the provided function a specified number of times with the index of each invocation.
 *
 * @param {number} count The number of times to invoke `fn`.
 * @param {Function} fn The function to invoke.
 * @returns {T[]} Returns an array of the results of invoking `fn`.
 * @example
 *
 * times(3, n => n * 2)
 * // => [0, 2, 4]
 */
// Overload signature when fn is not provided (returns number[])
export function times(count: number): number[];

// Overload signature when fn is provided (returns T[])
export function times<T>(count: number, fn: (n: number) => T): T[];

// Implementation of the function
export function times<T>(count: number, fn?: (n: number) => T): T[] {
  const result: T[] = [];
  for (let i = 0; i < count; i++) {
    // Cast i to any type to satisfy the compiler.
    // This is safe because of the function overloads.
    result.push(fn ? fn(i) : (i as any as T));
  }
  return result;
}

/**
 * Iterates over elements of `arr`, returning the first element `pred` returns truthy for.
 * The predicate is invoked with one argument: (value).
 *
 * @param {ArrLike<T>} arr The array-like value to inspect.
 * @param {(v: T) => boolean} pred The function invoked per iteration.
 * @returns {T | undefined} Returns the found element, else `undefined`.
 * @typeparam T The type of the values in the array-like object.
 * @example
 *
 * findBy([1, 2, 3, 4], x => x % 2 === 0)
 * // => 2
 *
 * findBy([1, 2, 3, 4], x => x > 4)
 * // => undefined
 */
export const findBy = <T>(arr: ArrLike<T>, pred: (v: T) => boolean): T | undefined => {
  for (let i = 0; i < arr.length; i++) {
    const val = arr[i];
    if (pred(val)) return val;
  }
};
