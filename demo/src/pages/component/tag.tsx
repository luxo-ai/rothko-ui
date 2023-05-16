import { Grid, WidthGeqOnly } from '@rothko-ui/ui';
import TagCard from '../../components/Cards/tag';
import NavigationList from '../../components/Navigation/NavigationList';
import React from 'react';

const Tag = () => {
  return (
    <Grid padding="2rem 0" gridTemplateColumns="minmax(100px, 250px) 1fr">
      <WidthGeqOnly threshold={750}>
        <NavigationList />
      </WidthGeqOnly>
      <TagCard />
    </Grid>
  );
};

export default Tag;
