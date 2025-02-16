import type React from 'react';

import { parseInt } from '../utils';

export const ListenableKeys = {
  Enter: 13,
  Tab: 9,
  Backspace: 8,
  Escape: 27,
  Space: 32,
  ArrowUp: 38,
  ArrowDown: 40,
  ArrowLeft: 37,
  ArrowRight: 39,
  Shift: 16,
  Control: 17,
  Alt: 18,
  Insert: 45,
  Delete: 46,
  PageUp: 33,
  PageDown: 34,
  Clear: 12,
} as const;

type Key = keyof typeof ListenableKeys;
type KeyCode = (typeof ListenableKeys)[Key];
type Handler<T> = (e: React.KeyboardEvent<T>) => void;

export const keyDownFactory = <T>(handlerMap: { [c in KeyCode]?: Handler<T> }) => {
  return (e: React.KeyboardEvent<T>) => {
    // get code
    const code = ListenableKeys[e.key as Key];
    if (typeof code === 'undefined') return;
    const handler = handlerMap[code];
    if (handler) {
      e.preventDefault();
      handler(e);
    }
  };
};

export const getKeyCode = (e: React.KeyboardEvent) => {
  const listenableCode = ListenableKeys[e.key as Key];
  if (typeof listenableCode === 'undefined') {
    const codeToInt = parseInt(e.key, 10);
    return isNaN(codeToInt) ? null : codeToInt;
  }
  return listenableCode;
};
