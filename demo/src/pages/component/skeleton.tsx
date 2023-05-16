import { Grid, WidthGeqOnly } from '@rothko-ui/ui';
import SkeletonCard from '../../components/Cards/skeleton';
import NavigationList from '../../components/Navigation/NavigationList';
import React from 'react';

const Skeleton = () => {
  return (
    <Grid padding="2rem 0" gridTemplateColumns="minmax(100px, 250px) 1fr">
      <WidthGeqOnly threshold={750}>
        <NavigationList />
      </WidthGeqOnly>
      <SkeletonCard />
    </Grid>
  );
};

export default Skeleton;
