import { Grid, WidthGeqOnly } from '@rothko-ui/ui';
import React from 'react';
import LoaderCard from '../../components/Cards/loader';
import NavigationList from '../../components/NavigationList';

const Loader = () => {
  return (
    <Grid padding="2rem 0" gridTemplateColumns="minmax(100px, 250px) 1fr">
      <WidthGeqOnly threshold={750}>
        <NavigationList />
      </WidthGeqOnly>
      <LoaderCard />
    </Grid>
  );
};

export default Loader;
