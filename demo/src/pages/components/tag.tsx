import React from 'react';
import TagCard from '../../components/Cards/tag';
import WithNavigation from '../../components/WithNavigation';

const Tag = () => {
  return (
    <WithNavigation selected="components/tag">
      <TagCard />
    </WithNavigation>
  );
};

export default Tag;
