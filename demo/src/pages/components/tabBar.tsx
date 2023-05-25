import React from 'react';
import TabBarCard from '../../components/ccards/tabBar';
import WithNavigation from '../../components/WithNavigation';

const TabBar = () => {
  return (
    <WithNavigation selected="components/tabBar">
      <TabBarCard />
    </WithNavigation>
  );
};

export default TabBar;
