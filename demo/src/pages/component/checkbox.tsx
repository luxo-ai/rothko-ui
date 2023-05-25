import React from 'react';
import CheckboxCard from '../../components/Cards/checkbox';
import WithNavigation from '../../components/WithNavigation';

const Checkbox = () => {
  return (
    <WithNavigation selected="components/checkbox">
      <CheckboxCard />
    </WithNavigation>
  );
};

export default Checkbox;
