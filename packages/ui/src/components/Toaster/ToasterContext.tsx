import { createContext } from 'react';
import type { ToastDetails, ToastKey } from './types';

type ToasterContextType = {
  removeToast: (key: ToastKey) => void;
  addToast: (toast: ToastDetails) => ToastKey;
};

const ToasterContext = createContext<ToasterContextType>({
  removeToast: () => {
    throw new Error('Outside of toast context');
  },
  addToast: () => {
    throw new Error('Outside of toast context');
  },
});

export default ToasterContext;
