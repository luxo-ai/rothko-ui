import React from 'react';
import RadioGroupCard from '../../components/cards/radio';
import WithNavigation from '../../components/WithNavigation';

const Radio = () => {
  return (
    <WithNavigation selected="components/radioGroup">
      <RadioGroupCard />
    </WithNavigation>
  );
};

export default Radio;
