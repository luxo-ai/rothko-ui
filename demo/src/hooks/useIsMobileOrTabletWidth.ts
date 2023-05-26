import { useMediaQuery } from 'react-responsive';

export const tabletOrMobileMaxWidth = 700; // px

const useIsMobileOrTabletWidth = () => {
  const isMobileOrTablet = useMediaQuery({ maxWidth: tabletOrMobileMaxWidth });
  return isMobileOrTablet;
};

export default useIsMobileOrTabletWidth;
