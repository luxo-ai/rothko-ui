import { createContext } from 'react';

type DrawerContextType = {
  isOpen: boolean;
  closeDrawer: () => void;
};

const DrawerContext = createContext<DrawerContextType>({
  isOpen: false,
  closeDrawer: () => {},
});

export default DrawerContext;
