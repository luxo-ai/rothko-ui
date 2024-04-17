import React from 'react';
import LinkCard from '../../components/cards/link';
import WithNavigation from '../../components/WithNavigation';

const Link = () => {
  return (
    <WithNavigation selected="components/link">
      <LinkCard />
    </WithNavigation>
  );
};

export default Link;
