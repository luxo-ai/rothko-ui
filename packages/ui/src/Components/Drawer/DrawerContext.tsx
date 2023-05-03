import { createContext, useContext } from 'react';

type IDrawerContext = {
  isOpen: boolean;
  closeDrawer: () => void;
  openDrawer: () => void;
};

export const DrawerContext = createContext<IDrawerContext | null>(null);

export const useDrawerContext = () => {
  const ctx = useContext(DrawerContext);
  if (!ctx) {
    throw new Error('Calling "useDrawerContext" outside of context');
  }
  return ctx;
};
