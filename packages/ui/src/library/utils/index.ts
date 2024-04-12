import { isFunction } from '@rothko-ui/utils';
import type { RothkoKind } from '../../theme';
import { rothkoKinds } from '../../theme/types';

/**
 * Checks if a given value is a functional component.
 * @param v - The value to check.
 * @returns True if the value is a functional component, false otherwise.
 */
export const isFunctionalComponent = <T>(v: React.ReactNode | React.FC<T>): v is React.FC<T> => {
  return isFunction(v);
};

/**
 * Checks if a given value is a Rothko kind.
 * @param v - The value to check.
 * @returns True if the value is a Rothko kind, false otherwise.
 */
export const isRothkoKind = (v: string): v is RothkoKind => {
  return (rothkoKinds as readonly string[]).includes(v);
};
