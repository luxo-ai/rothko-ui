import { useCallback, useRef } from 'react';

export const useScrollIntoView = () => {
  const scrollElRef = useRef<HTMLDivElement>(null);

  const scrollIntoView = useCallback(
    (childSelector: string) => {
      const menu = scrollElRef.current;
      if (!menu) return;

      const childElement = menu.querySelector<HTMLElement>(childSelector);
      if (!childElement) return;

      const isOutOfUpperView = childElement.offsetTop < menu.scrollTop;
      const isOutOfLowerView =
        childElement.offsetTop + childElement.clientHeight > menu.scrollTop + menu.clientHeight;

      if (isOutOfUpperView) {
        menu.scrollTop = childElement.offsetTop;
      } else if (isOutOfLowerView) {
        menu.scrollTop = childElement.offsetTop + childElement.clientHeight - menu.clientHeight;
      }
    },
    [scrollElRef]
  );

  return { scrollIntoView, scrollElRef };
};
