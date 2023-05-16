import { Grid, WidthGeqOnly } from '@rothko-ui/ui';
import RadioCard from '../../components/Cards/radio';
import NavigationList from '../../components/Navigation/NavigationList';
import React from 'react';

const Radio = () => {
  return (
    <Grid padding="2rem 0" gridTemplateColumns="minmax(100px, 250px) 1fr">
      <WidthGeqOnly threshold={750}>
        <NavigationList />
      </WidthGeqOnly>
      <RadioCard />
    </Grid>
  );
};

export default Radio;
