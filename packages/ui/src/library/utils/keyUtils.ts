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
