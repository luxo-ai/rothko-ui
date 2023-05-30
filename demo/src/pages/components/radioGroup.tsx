import React from 'react';
import RadioGroupCard from '../../components/cards/radio';
import WithNavigation from '../../components/WithNavigation';

const Radio = () => {
  return (
    <WithNavigation selected="components/radio">
      <RadioGroupCard />
    </WithNavigation>
  );
};

export default Radio;
