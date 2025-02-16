import { useContext } from 'react';
import { useMediaQuery } from 'react-responsive';

import { IsMobileOrTabletContext } from '../components/IsMobileOrTabletContext';

export const tabletOrMobileMaxWidth = 700; // px

export const useIsMobileOrTablet = () => {
  const isMobileOrTabletDevice = useContext(IsMobileOrTabletContext);
  const isMobileOrTabletWidth = useMediaQuery({ maxWidth: tabletOrMobileMaxWidth });
  return isMobileOrTabletDevice || isMobileOrTabletWidth;
};
