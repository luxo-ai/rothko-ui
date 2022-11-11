import type { PropsWithChildren } from 'react';
import React from 'react';

export function When<T>({ children, isTruthy }: PropsWithChildren<{ isTruthy: T }>) {
  return isTruthy ? <>{children}</> : null;
}
