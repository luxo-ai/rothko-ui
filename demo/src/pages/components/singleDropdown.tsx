import React from 'react';
import SingleDropdownCard from '../../components/Cards/singleDropdown';
import WithNavigation from '../../components/WithNavigation';

const SingleDropdown = () => {
  return (
    <WithNavigation selected="components/singleDropdown">
      <SingleDropdownCard />
    </WithNavigation>
  );
};

export default SingleDropdown;
