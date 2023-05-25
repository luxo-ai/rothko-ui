import React from 'react';
import InputCard from '../../components/ccards/input';
import WithNavigation from '../../components/WithNavigation';

const Input = () => {
  return (
    <WithNavigation selected="components/input">
      <InputCard />
    </WithNavigation>
  );
};

export default Input;
