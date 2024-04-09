import type React from 'react';
import { useCallback } from 'react';
import keyboardKey from 'keyboard-key';

const keys = [
  keyboardKey.Enter,
  keyboardKey.ArrowUp,
  keyboardKey.ArrowDown,
  keyboardKey.Spacebar,
  keyboardKey.Tab,
] as const;

type Key = (typeof keys)[number];
type Handler<T> = (e: React.KeyboardEvent<T>) => void;

type HookArgs<T> = {
  [k in Key]?: Handler<T>;
};

const useOnKeyDown = <T>(handlerMap: HookArgs<T>) => {
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<T>) => {
      const code = keyboardKey.getCode(e);
      if (typeof code === 'undefined') return;
      const handler = handlerMap[code as Key];
      if (handler) {
        e.preventDefault();
        handler(e);
      }
    },
    [handlerMap]
  );

  return onKeyDown;
};

export default useOnKeyDown;
