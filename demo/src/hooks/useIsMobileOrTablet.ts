import { useContext } from 'react';
import { IsMobileOrTabletContext } from '../components/IsMobileOrTabletContext';
import useIsMobileOrTabletWidth from './useIsMobileOrTabletWidth';

export const useIsMobileOrTablet = () => {
  const isMobileOrTabletDevice = useContext(IsMobileOrTabletContext);
  const isMobileOrTabletWidth = useIsMobileOrTabletWidth();
  return isMobileOrTabletDevice || isMobileOrTabletWidth;
};
