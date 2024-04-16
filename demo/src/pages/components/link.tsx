import React from 'react';
import LinkCard from '../../components/cards/link';
import WithNavigation from '../../components/WithNavigation';

const Input = () => {
  return (
    <WithNavigation selected="components/link">
      <LinkCard />
    </WithNavigation>
  );
};

export default Input;
