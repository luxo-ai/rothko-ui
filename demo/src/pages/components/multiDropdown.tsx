import React from 'react';
import MultiDropdownCard from '../../components/ccards/multiDropdown';
import WithNavigation from '../../components/WithNavigation';

const MultiDropdown = () => {
  return (
    <WithNavigation selected="components/multiDropdown">
      <MultiDropdownCard />
    </WithNavigation>
  );
};

export default MultiDropdown;
