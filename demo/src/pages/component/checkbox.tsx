import { Grid, WidthGeqOnly } from '@rothko-ui/ui';
import NavigationList from '../../components/NavigationList';
import React from 'react';
import CheckboxCard from '../../components/Cards/checkbox';

const Checkbox = () => {
  return (
    <Grid padding="2rem 0" gridTemplateColumns="minmax(100px, 250px) 1fr">
      <WidthGeqOnly threshold={750}>
        <NavigationList />
      </WidthGeqOnly>
      <CheckboxCard />
    </Grid>
  );
};

export default Checkbox;
