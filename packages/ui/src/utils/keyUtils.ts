import keyboardKey from 'keyboard-key';
import type React from 'react';

const keys = [
  keyboardKey.Enter,
  keyboardKey.ArrowUp,
  keyboardKey.ArrowDown,
  keyboardKey.Spacebar,
  keyboardKey.Tab,
] as const;

type Key = (typeof keys)[number];
type Handler<T> = (e: React.KeyboardEvent<T>) => void;

export const directionMap: Record<number, -1 | 1> = {
  [keyboardKey.ArrowUp]: -1,
  [keyboardKey.ArrowDown]: 1,
};

export const keyDownFactory = <T>(handlerMap: { [k in Key]?: Handler<T> }) => {
  return (e: React.KeyboardEvent<T>) => {
    const code = keyboardKey.getCode(e);
    if (typeof code === 'undefined') return;
    const handler = handlerMap[code as Key];
    if (handler) {
      e.preventDefault();
      handler(e);
    }
  };
};

export const keyDownFactory2 = <T>(
  callback: (event: React.KeyboardEvent<T>, code: Key) => void
): ((event: React.KeyboardEvent<T>) => void) => {
  return (event: React.KeyboardEvent<T>) => {
    const code = keyboardKey.getCode(event);
    if (typeof code === 'undefined') return;
    callback(event, code as Key);
  };
};
