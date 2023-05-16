import { Grid, WidthGeqOnly } from '@rothko-ui/ui';
import NavigationList from '../../components/Navigation/NavigationList';
import React from 'react';
import BreadCrumbsCard from '../../components/Cards/breadCrumbs';

const BreadCrumbs = () => {
  return (
    <Grid padding="2rem 0" gridTemplateColumns="minmax(100px, 250px) 1fr">
      <WidthGeqOnly threshold={750}>
        <NavigationList />
      </WidthGeqOnly>
      <BreadCrumbsCard />
    </Grid>
  );
};

export default BreadCrumbs;
