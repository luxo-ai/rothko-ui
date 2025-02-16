import { useTransition } from '@react-spring/web';
import { DomPortal } from '@rothko-ui/system';
import React, { useCallback, useMemo, useState } from 'react';
import * as uuid from 'uuid';

import Toast from './Toaster';
import ToasterContext from './ToasterContext';
import type { ToastDetails, ToastKey } from './types';

const DEFAULT_DURATION_MS = 3000;

const EXIT_CONFIG = {
  friction: 20,
  precision: 0.1,
  tension: 125,
} as const;

type ToastContextProviderProps = {
  children?: React.ReactNode;
};

const toastsClassnames = [
  'fixed',
  'flex',
  'flex-col',
  'gap-4', // 1rem
  'bottom-[0.75rem]',
  'right-0',
  'my-[0.25rem]',
  'mx-[1rem]',
  'min-w-[10rem]',
  'max-w-[max(18rem,20%)]',
  'md:right-[0.75rem]',
  'md:max-w-[max(32rem,20%)]',
  'md:min-w-[15rem]',
  'z-[99999]',
].join(' ');

const ToastContextProvider = ({ children }: ToastContextProviderProps) => {
  const refMap = useMemo(() => new WeakMap(), []);
  const cancelMap = useMemo(() => new WeakMap(), []);
  const [toasts, setToasts] = useState<(ToastDetails & { key: ToastKey })[]>([]);

  const addToast = useCallback(
    (t: ToastDetails) => {
      const toastUuid = uuid.v4();
      setToasts(existing => [...existing, { ...t, key: toastUuid }]);
      return toastUuid;
    },
    [setToasts]
  );

  const removeToast = useCallback(
    (key: ToastKey) => {
      setToasts(existing => existing.filter(t => t.key !== key));
    },
    [setToasts]
  );

  const transitions = useTransition(toasts, {
    keys: toast => toast.key,
    from: { opacity: 0, height: 0, life: '100%' },
    enter: toast => async (next, cancel) => {
      cancelMap.set(toast, cancel);
      await next({ opacity: 1, height: refMap.get(toast).offsetHeight });
      await next({ life: '0%' });
    },
    leave: [{ opacity: 0 }, { height: 0 }],
    onRest: (_result, _ctrl, toast) => {
      setToasts(state => state.filter(i => i.key !== toast.key));
    },
    config: (toast, _index, phase) => key =>
      phase === 'enter' && key === 'life'
        ? { duration: toast.duration ?? DEFAULT_DURATION_MS }
        : EXIT_CONFIG,
  });

  return (
    <ToasterContext.Provider value={{ removeToast, addToast }}>
      <DomPortal wrapperId="toaster">
        <div className={toastsClassnames}>
          {transitions((style, toast) => (
            <Toast
              key={toast.key}
              ref={(ref: HTMLDivElement) => ref && refMap.set(toast, ref)}
              label={toast.label}
              content={toast.content}
              kind={toast.kind}
              withLife={toast.withLife}
              animatedStyle={style}
              onClose={e => {
                e.stopPropagation();
                if (cancelMap.has(toast) && style.life.get() !== '0%') {
                  cancelMap.get(toast)();
                }
              }}
            />
          ))}
        </div>
      </DomPortal>
      {children}
    </ToasterContext.Provider>
  );
};

export default ToastContextProvider;
