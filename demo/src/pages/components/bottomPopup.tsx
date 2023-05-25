import React from 'react';
import BottomPopupCard from '../../components/cards/bottomPopup';
import WithNavigation from '../../components/WithNavigation';

const BottomPopup = () => {
  return (
    <WithNavigation selected="components/bottomPopup">
      <BottomPopupCard />
    </WithNavigation>
  );
};

export default BottomPopup;
