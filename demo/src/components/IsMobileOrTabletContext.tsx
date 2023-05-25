import { createContext, useContext } from 'react';

export const IsMobileOrTabletContext = createContext(false);

export const useIsMobileOrTablet = () => useContext(IsMobileOrTabletContext);
