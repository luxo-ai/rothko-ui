import { useContext } from 'react';
import { IsMobileOrTabletContext } from '../components/IsMobileOrTabletContext';
import { useMediaQuery } from 'react-responsive';

export const tabletOrMobileMaxWidth = 700; // px

export const useIsMobileOrTablet = () => {
  const isMobileOrTabletDevice = useContext(IsMobileOrTabletContext);
  const isMobileOrTabletWidth = useMediaQuery({ maxWidth: tabletOrMobileMaxWidth });
  return isMobileOrTabletDevice || isMobileOrTabletWidth;
};
