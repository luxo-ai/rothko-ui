import React from 'react';
import MultiDropdownCard from '../../components/cards/multiDropdown';
import WithNavigation from '../../components/WithNavigation';

const MultiDropdown = () => {
  return (
    <WithNavigation selected="components/multiDropdown">
      <MultiDropdownCard />
    </WithNavigation>
  );
};

export default MultiDropdown;
