import React from 'react';
import RadioCard from '../../components/cards/radio';
import WithNavigation from '../../components/WithNavigation';

const Radio = () => {
  return (
    <WithNavigation selected="components/radio">
      <RadioCard />
    </WithNavigation>
  );
};

export default Radio;
