import { useCallback, useRef, useState } from 'react';

type HookArgs = {
  delay?: number;
};

const useTooltip = ({ delay = 300 }: HookArgs = {}) => {
  const tooltipTimeout = useRef<NodeJS.Timeout | null>(null);
  const [active, setActive] = useState(false);

  const showToolTip = useCallback(() => {
    tooltipTimeout.current = setTimeout(() => {
      setActive(true);
    }, delay);
  }, [delay, setActive, tooltipTimeout]);

  const hideToolTip = useCallback(() => {
    if (!tooltipTimeout.current) return;
    clearInterval(tooltipTimeout.current);
    setActive(false);
  }, [setActive, tooltipTimeout]);

  return [active, { showToolTip, hideToolTip }] as const;
};

export default useTooltip;
