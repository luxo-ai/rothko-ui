import noop from 'lodash/noop';
import { createContext, useContext } from 'react';

type IDrawerContext = {
  isOpen: boolean;
  closeDrawer: () => void;
};

export const DrawerContext = createContext<IDrawerContext>({
  isOpen: false,
  closeDrawer: noop,
});

export const useDrawerContext = () => useContext(DrawerContext);
