import { Grid, WidthGeqOnly } from '@rothko-ui/ui';
import React from 'react';
import ListCard from '../../components/Cards/list';
import NavigationList from '../../components/NavigationList';

const List = () => {
  return (
    <Grid padding="2rem 0" gridTemplateColumns="minmax(100px, 250px) 1fr">
      <WidthGeqOnly threshold={750}>
        <NavigationList />
      </WidthGeqOnly>
      <ListCard />
    </Grid>
  );
};

export default List;
