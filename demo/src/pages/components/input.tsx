import React from 'react';
import InputCard from '../../components/cards/input';
import WithNavigation from '../../components/WithNavigation';

const Input = () => {
  return (
    <WithNavigation selected="components/input">
      <InputCard />
    </WithNavigation>
  );
};

export default Input;
