import { useContext } from 'react';

import Drawer from './Drawer';
import DrawerContext from './DrawerContext';

const useDrawerContext = () => useContext(DrawerContext);

export { Drawer, useDrawerContext };
