import React from 'react';
import DrawerCard from '../../components/cards/drawer';
import WithNavigation from '../../components/WithNavigation';

const Drawer = () => {
  return (
    <WithNavigation selected="components/drawer">
      <DrawerCard />
    </WithNavigation>
  );
};

export default Drawer;
