import { isArray, isEmpty, memoize } from 'utils';
import keyboardKey from 'keyboard-key';
import type { ReactElement, ReactNode } from 'react';
import React from 'react';

const keys = [
  keyboardKey.Enter,
  keyboardKey.ArrowUp,
  keyboardKey.ArrowDown,
  keyboardKey.Spacebar,
  keyboardKey.Tab,
] as const;

type Key = typeof keys[number];
type Handler<T> = (e: React.KeyboardEvent<T>) => void;

export const directionMap: Record<number, -1 | 1> = {
  [keyboardKey.ArrowUp]: -1,
  [keyboardKey.ArrowDown]: 1,
};

export const keyDownFactory = <T>(handlerMap: { [k in Key]?: Handler<T> }) => {
  return (e: React.KeyboardEvent<T>) => {
    const code = keyboardKey.getCode(e);
    if (!code) return;
    const handler = handlerMap[code as Key];
    if (handler) {
      handler(e);
      e.preventDefault();
    }
  };
};

export const findFirstTextChild = memoize((root: ReactNode) => {
  const isDiscoverable = (v: any): v is string | number | ReactElement | any[] => {
    return typeof v === 'string' || typeof v === 'number' || React.isValidElement(v) || isArray(v);
  };

  let asArray = React.Children.toArray(root).filter(isDiscoverable);
  // bfs
  while (!isEmpty(asArray)) {
    const [node, ...rest] = asArray;
    asArray = rest;

    if (typeof node === 'string') {
      return node;
    }
    if (typeof node === 'number') {
      return String(node);
    }
    if (isDiscoverable(node)) {
      const children = (isArray(node) ? node : [node.props?.children]).filter(isDiscoverable);
      asArray.push(...children);
    }
  }
});
