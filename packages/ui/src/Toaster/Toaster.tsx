import { CloseOutline } from '@aemiko/icons';
import { animated, useTransition } from '@react-spring/web';
import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import styled from 'styled-components';
import uuid from 'uuid';
import { PhantomButton } from '../Button/PhantomButton';

type Toast = {
  label?: React.ReactNode;
  content?: React.ReactNode;
  duration?: number;
};

type ToastKey = string;

type IToasterCtx = {
  removeToast: (key: ToastKey) => void;
  addToast: (toast: Toast) => ToastKey;
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
  const [toasts, setToasts] = useState<(Toast & { key: ToastKey })[]>([]);

  const addToast = useCallback(
    (t: Toast) => {
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

  const timeout = 3000;
  const config = { tension: 125, friction: 20, precision: 0.1 };

  const transitions = useTransition(toasts, {
    from: { opacity: 0, height: 0, life: '100%' },
    keys: toast => toast.key,
    enter: toast => async (next, cancel) => {
      cancelMap.set(toast, cancel);
      await next({ opacity: 1, height: refMap.get(toast).offsetHeight });
      await next({ life: '0%' });
    },
    leave: [{ opacity: 0 }, { height: 0 }],
    onRest: (_result, _ctrl, toast) => {
      setToasts(state => state.filter(i => i.key !== toast.key));
    },
    config: (_toast, _index, phase) => key =>
      phase === 'enter' && key === 'life' ? { duration: timeout } : config,
  });

  return (
    <ToastCtx.Provider value={{ removeToast, addToast }}>
      {children}
      <ToastsContainerDiv id="toaster">
        {transitions(({ life, ...style }, toast) => (
          <ToastContainerDiv style={style} key={toast.key}>
            <Life style={{ right: life }} />
            <PhantomButton
              style={{ position: 'absolute', top: 10, right: 10 }}
              onClick={e => {
                e.stopPropagation();
                if (cancelMap.has(toast) && life.get() !== '0%') {
                  cancelMap.get(toast)();
                }
              }}
            >
              <CloseOutline width={16} height={16} />
            </PhantomButton>
            <Content ref={(ref: HTMLDivElement) => ref && refMap.set(toast, ref)}>
              {toast.label && <p>{toast.label}</p>}
              {toast.content && <p>{toast.content}</p>}
            </Content>
          </ToastContainerDiv>
        ))}
      </ToastsContainerDiv>
    </ToastCtx.Provider>
  );
};

const ToastsContainerDiv = styled.div`
  position: fixed;
  bottom: 0.75rem;
  right: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 99999;
  max-width: max(32rem, 20%);
`;

const ToastContainerDiv = styled(animated.div)`
  margin: auto;
  border-radius: 0.125rem;
  border: 1px solid black;
  background: white;
  min-height: 4rem;
  & > p {
    margin: 0;
  }
  position: relative;
`;

const Content = styled.div`
  padding: 1rem;
  overflow: hidden;
  height: auto;
`;

const Life = styled(animated.div)`
  position: absolute;
  bottom: 0;
  left: 0px;
  width: auto;
  background-image: linear-gradient(130deg, #00b4e6, #00f0e0);
  height: 5px;
`;
