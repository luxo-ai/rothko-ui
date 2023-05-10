import { Grid, WidthGeqOnly } from '@rothko-ui/ui';
import React from 'react';
import IconsCard from '../components/Cards/icons';
import NavigationList from '../components/NavigationList';

const Icons = () => {
  return (
    <Grid padding="2rem 0" gridTemplateColumns="minmax(100px, 250px) 1fr">
      <WidthGeqOnly threshold={750}>
        <NavigationList />
      </WidthGeqOnly>
      <IconsCard />
    </Grid>
  );
};

export default Icons;
