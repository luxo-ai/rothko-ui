import { Grid, WidthGeqOnly } from '@rothko-ui/ui';
import React from 'react';
import ToggleCard from '../../components/Cards/toggle';
import NavigationList from '../../components/NavigationList';

const Toggle = () => {
  return (
    <Grid padding="2rem 0" gridTemplateColumns="minmax(100px, 250px) 1fr">
      <WidthGeqOnly threshold={750}>
        <NavigationList />
      </WidthGeqOnly>
      <ToggleCard />
    </Grid>
  );
};

export default Toggle;
