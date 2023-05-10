import { Grid, WidthGeqOnly } from '@rothko-ui/ui';
import React from 'react';
import DrawerCard from '../../components/Cards/drawer';
import NavigationList from '../../components/NavigationList';

const Drawer = () => {
  return (
    <Grid padding="2rem 0" gridTemplateColumns="minmax(100px, 250px) 1fr">
      <WidthGeqOnly threshold={750}>
        <NavigationList />
      </WidthGeqOnly>
      <DrawerCard />
    </Grid>
  );
};

export default Drawer;
