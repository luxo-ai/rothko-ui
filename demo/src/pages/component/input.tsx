import { Grid, WidthGeqOnly } from '@rothko-ui/ui';
import React from 'react';
import InputCard from '../../components/Cards/input';
import NavigationList from '../../components/NavigationList';

const Input = () => {
  return (
    <Grid padding="2rem 0" gridTemplateColumns="minmax(100px, 250px) 1fr">
      <WidthGeqOnly threshold={750}>
        <NavigationList />
      </WidthGeqOnly>
      <InputCard />
    </Grid>
  );
};

export default Input;
