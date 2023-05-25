import React from 'react';
import ToggleCard from '../../components/cards/toggle';
import WithNavigation from '../../components/WithNavigation';

const Toggle = () => {
  return (
    <WithNavigation selected="components/toggle">
      <ToggleCard />
    </WithNavigation>
  );
};

export default Toggle;
