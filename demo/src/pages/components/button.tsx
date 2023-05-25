import React from 'react';
import ButtonCard from '../../components/cards/button';
import WithNavigation from '../../components/WithNavigation';

const Button = () => {
  return (
    <WithNavigation selected="components/button">
      <ButtonCard />
    </WithNavigation>
  );
};

export default Button;
