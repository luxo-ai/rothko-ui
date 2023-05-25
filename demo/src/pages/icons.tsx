import React from 'react';
import IconsCard from '../components/ccards/icons';
import WithNavigation from '../components/WithNavigation';

const Icons = () => {
  return (
    <WithNavigation selected="/icons">
      <IconsCard />
    </WithNavigation>
  );
};

export default Icons;
