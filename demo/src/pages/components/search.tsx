import React from 'react';
import SearchCard from '../../components/ccards/search';
import WithNavigation from '../../components/WithNavigation';

const Search = () => {
  return (
    <WithNavigation selected="components/search">
      <SearchCard />
    </WithNavigation>
  );
};

export default Search;
