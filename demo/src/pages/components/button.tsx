import React from 'react';
import ButtonCard from '../../components/ccards/button';
import WithNavigation from '../../components/WithNavigation';

const Button = () => {
  return (
    <WithNavigation selected="components/button">
      <ButtonCard />
    </WithNavigation>
  );
};

export default Button;
