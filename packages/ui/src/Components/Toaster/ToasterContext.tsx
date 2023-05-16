import { useTransition } from '@react-spring/web';
import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import styled from 'styled-components';
import * as uuid from 'uuid';
import { DomPortal } from '../../Library/Portal';
import Toast from './Toaster';
import type { ToastDetails, ToastKey } from './types';

const DEFAULT_DURATION_MS = 3000;

const EXIT_CONFIG = {
  friction: 20,
  precision: 0.1,
  tension: 125,
} as const;

type IToasterCtx = {
  removeToast: (key: ToastKey) => void;
  addToast: (toast: ToastDetails) => ToastKey;
};

const ToastCtx = createContext<IToasterCtx | null>(null);

export const useToaster = () => {
  const ctx = useContext(ToastCtx);
  if (!ctx) {
    throw new Error('Outside of toast context');
  }
  return ctx;
};

type ToastContextProviderProps = {
  children?: React.ReactNode;
};

export const ToastContextProvider = ({ children }: ToastContextProviderProps) => {
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
    <ToastCtx.Provider value={{ removeToast, addToast }}>
      <DomPortal wrapperId="toast">
        <ToastsContainerDiv>
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
        </ToastsContainerDiv>
      </DomPortal>
      {children}
    </ToastCtx.Provider>
  );
};

export const mobileXsMaxWidth = 300; // ps
export const mobileMaxWidth = 480; // px
export const tabletOrMobileMaxWidth = 800; // px

const ToastsContainerDiv = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  bottom: 0.75rem;
  margin: 0.25rem 1rem;

  @media only screen and (min-width: ${tabletOrMobileMaxWidth}px) {
    right: 0.75rem;
    max-width: max(32rem, 20%);
  }

  z-index: 99999;
`;
