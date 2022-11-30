import { Grid, WidthGeqOnly } from '@rothko-ui/ui';
import NavigationList from '../../components/NavigationList';
import React from 'react';
import ButtonCard from '../../components/Cards/button';

const Button = () => {
  return (
    <Grid padding="2rem 0" gridTemplateColumns="minmax(100px, 250px) 1fr">
      <WidthGeqOnly threshold={750}>
        <NavigationList />
      </WidthGeqOnly>
      <ButtonCard />
    </Grid>
  );
};

export default Button;
