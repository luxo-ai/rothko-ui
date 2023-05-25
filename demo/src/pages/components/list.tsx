import React from 'react';
import ListCard from '../../components/Cards/list';
import WithNavigation from '../../components/WithNavigation';

const List = () => {
  return (
    <WithNavigation selected="components/list">
      <ListCard />
    </WithNavigation>
  );
};

export default List;
