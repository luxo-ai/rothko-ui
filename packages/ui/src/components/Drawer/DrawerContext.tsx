import { createContext } from 'react';

import { noop } from '@rothko-ui/utils';

type DrawerContextType = {
  isOpen: boolean;
  closeDrawer: () => void;
};

const DrawerContext = createContext<DrawerContextType>({
  isOpen: false,
  closeDrawer: noop,
});

export default DrawerContext;
