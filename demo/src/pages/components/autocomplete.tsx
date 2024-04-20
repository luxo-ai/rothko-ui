import React from 'react';
import AutocompleteCard from '../../components/cards/autocomplete';
import WithNavigation from '../../components/WithNavigation';

const Autocomplete = () => {
  return (
    <WithNavigation selected="components/autocomplete">
      <AutocompleteCard />
    </WithNavigation>
  );
};

export default Autocomplete;
