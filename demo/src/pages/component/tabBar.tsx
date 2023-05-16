import { Grid, WidthGeqOnly } from '@rothko-ui/ui';
import TabBarCard from '../../components/Cards/tabBar';
import NavigationList from '../../components/Navigation/NavigationList';
import React from 'react';

const TabBar = () => {
  return (
    <Grid padding="2rem 0" gridTemplateColumns="minmax(100px, 250px) 1fr">
      <WidthGeqOnly threshold={750}>
        <NavigationList />
      </WidthGeqOnly>
      <TabBarCard />
    </Grid>
  );
};

export default TabBar;
