import React, { createContext, useMemo, useCallback, useContext, useState } from 'react';
import styled from 'styled-components';
import uuid from 'uuid';
import { useTransition, animated } from '@react-spring/web';

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
    onRest: (result, ctrl, toast) => {
      setToasts(state =>
        state.filter(i => {
          return i.key !== toast.key;
        })
      );
    },
    config: (toast, index, phase) => key =>
      phase === 'enter' && key === 'life' ? { duration: timeout } : config,
  });

  return (
    <ToastCtx.Provider value={{ removeToast, addToast }}>
      {children}
      <ToastsContainerDiv id="toaster">
        {transitions(({ life, ...style }, toast) => (
          <ToastContainerDiv style={style} key={toast.key}>
            <Content ref={(ref: HTMLDivElement) => ref && refMap.set(toast, ref)}>
              <Life style={{ right: life }} />
              {toast.label && <p>{toast.label}</p>}
              {toast.content && <p>{toast.content}</p>}
              <button
                onClick={e => {
                  e.stopPropagation();
                  if (cancelMap.has(toast) && life.get() !== '0%') cancelMap.get(toast)();
                }}
              >
                cancel
              </button>
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
  padding: 0.75rem;
  border-radius: 0.125rem;
  border: 1px solid black;
  background: white;
  min-height: 4rem;
  & > p {
    margin: 0;
  }
`;
//  ref={(ref: HTMLDivElement) => ref && refMap.set(toast, ref)}
const Content = styled.div`
  color: white;
  background: #445159;
  opacity: 0.9;
  padding: 12px 22px;
  font-size: 1em;
  display: grid;
  grid-template-columns: 1fr auto;
  grid-gap: 10px;
  overflow: hidden;
  height: auto;
  border-radius: 3px;
  margin-top: 10px;
  position: relative;
`;

export const Message = styled(animated.div)`
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  width: 40ch;
  @media (max-width: 680px) {
    width: 100%;
  }
`;

export const Life = styled(animated.div)`
  position: absolute;
  bottom: 0;
  left: 0px;
  width: auto;
  background-image: linear-gradient(130deg, #00b4e6, #00f0e0);
  height: 5px;
`;
