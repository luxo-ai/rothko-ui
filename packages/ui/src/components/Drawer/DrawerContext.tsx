import { createContext, useContext } from 'react';

import { noop } from '@rothko-ui/utils';

type IDrawerContext = {
  isOpen: boolean;
  closeDrawer: () => void;
};

export const DrawerContext = createContext<IDrawerContext>({
  isOpen: false,
  closeDrawer: noop,
});

export const useDrawerContext = () => useContext(DrawerContext);
