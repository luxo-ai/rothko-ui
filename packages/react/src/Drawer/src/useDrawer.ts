import { useContext } from 'react';

import DrawerContext from './DrawerContext';

const useDrawer = () => useContext(DrawerContext);

export default useDrawer;
