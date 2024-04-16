import { isFunction } from '@rothko-ui/utils';

/**
 * Checks if a given value is a functional component.
 * @param v - The value to check.
 * @returns True if the value is a functional component, false otherwise.
 */
export const isFunctionalComponent = <T>(v: React.ReactNode | React.FC<T>): v is React.FC<T> => {
  return isFunction(v);
};
