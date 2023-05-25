import React from 'react';
import DropdownCard from '../../components/Cards/dropdown';
import WithNavigation from '../../components/WithNavigation';

const Dropdown = () => {
  return (
    <WithNavigation selected="components/dropdown">
      <DropdownCard />
    </WithNavigation>
  );
};

export default Dropdown;
