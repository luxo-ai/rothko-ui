import { Grid, WidthGeqOnly } from '@rothko-ui/ui';
import SingleDropdownCard from '../../components/Cards/singleDropdown';
import NavigationList from '../../components/Navigation/NavigationList';
import React from 'react';

const SingleDropdown = () => {
  return (
    <Grid padding="2rem 0" gridTemplateColumns="minmax(100px, 250px) 1fr">
      <WidthGeqOnly threshold={750}>
        <NavigationList selected="component/singleDropdown" />
      </WidthGeqOnly>
      <SingleDropdownCard />
    </Grid>
  );
};

export default SingleDropdown;
