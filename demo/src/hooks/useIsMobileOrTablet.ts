import { useMediaQuery } from 'react-responsive';

export const tabletOrMobileMaxWidth = 700; // px

export const useIsMobileOrTablet = () => {
  const isMobileOrTablet = useMediaQuery({ maxWidth: tabletOrMobileMaxWidth });
  return isMobileOrTablet;
};
