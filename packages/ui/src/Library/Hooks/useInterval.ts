import { useRef, useEffect } from 'react';

type Callback<T> = () => T;

const useInterval = <T>(callback: Callback<T>, delayMs: number) => {
  const callbackRef = useRef<Callback<T>>();

  useEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    function tick() {
      callbackRef.current?.();
    }
    const timeoutId = setInterval(tick, delayMs);
    return () => clearInterval(timeoutId);
  }, [delayMs]);
};

export default useInterval;
