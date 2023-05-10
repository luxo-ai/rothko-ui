import { Grid, WidthGeqOnly } from '@rothko-ui/ui';
import MultiDropdownCard from '../../components/Cards/multiDropdown';
import NavigationList from '../../components/NavigationList';
import React from 'react';

const MultiDropdown = () => {
  return (
    <Grid padding="2rem 0" gridTemplateColumns="minmax(100px, 250px) 1fr">
      <WidthGeqOnly threshold={750}>
        <NavigationList />
      </WidthGeqOnly>
      <MultiDropdownCard />
    </Grid>
  );
};

export default MultiDropdown;
