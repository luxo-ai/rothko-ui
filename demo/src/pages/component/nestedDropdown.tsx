import { Grid, WidthGeqOnly } from '@rothko-ui/ui';
import NestedDropdownCard from '../../components/Cards/nestedDropdown';
import NavigationList from '../../components/Navigation/NavigationList';
import React from 'react';

const NestedDropdown = () => {
  return (
    <Grid padding="2rem 0" gridTemplateColumns="minmax(100px, 250px) 1fr">
      <WidthGeqOnly threshold={750}>
        <NavigationList />
      </WidthGeqOnly>
      <NestedDropdownCard />
    </Grid>
  );
};

export default NestedDropdown;
