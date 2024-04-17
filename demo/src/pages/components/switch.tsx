import React from 'react';
import SwitchCard from '../../components/cards/switch';
import WithNavigation from '../../components/WithNavigation';

const Switch = () => {
  return (
    <WithNavigation selected="components/switch">
      <SwitchCard />
    </WithNavigation>
  );
};

export default Switch;
