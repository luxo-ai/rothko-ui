import { useRef, useEffect } from 'react';

type Callback<T> = () => T;

export const useInterval = <T>(callback: Callback<T>, delayMs: number) => {
  const callbackRef = useRef<Callback<T>>(callback);

  useEffect(() => {
    function tick() {
      callbackRef.current?.();
    }
    const timeoutId = setInterval(tick, delayMs);
    return () => clearInterval(timeoutId);
  }, [delayMs]);
};
