import React from 'react';
import BreadCrumbsCard from '../../components/cards/breadCrumbs';
import WithNavigation from '../../components/WithNavigation';

const BreadCrumbs = () => {
  return (
    <WithNavigation selected="components/breadCrumbs">
      <BreadCrumbsCard />
    </WithNavigation>
  );
};

export default BreadCrumbs;
