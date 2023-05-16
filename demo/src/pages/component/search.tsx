import { Grid, WidthGeqOnly } from '@rothko-ui/ui';
import SearchCard from '../../components/Cards/search';
import NavigationList from '../../components/Navigation/NavigationList';
import React from 'react';

const Search = () => {
  return (
    <Grid padding="2rem 0" gridTemplateColumns="minmax(100px, 250px) 1fr">
      <WidthGeqOnly threshold={750}>
        <NavigationList />
      </WidthGeqOnly>
      <SearchCard />
    </Grid>
  );
};

export default Search;
