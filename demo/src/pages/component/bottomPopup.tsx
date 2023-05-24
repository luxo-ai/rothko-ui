import React from 'react';
import BottomPopupCard from '../../components/Cards/bottomPopup';
import WithNavigation from '../../components/WithNavigation';

const BottomPopup = () => {
  return (
    <WithNavigation>
      <BottomPopupCard />
    </WithNavigation>
  );
};

export default BottomPopup;
