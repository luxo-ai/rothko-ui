import React from 'react';
import BreadCrumbsCard from '../../components/ccards/breadCrumbs';
import WithNavigation from '../../components/WithNavigation';

const BreadCrumbs = () => {
  return (
    <WithNavigation selected="components/breadCrumbs">
      <BreadCrumbsCard />
    </WithNavigation>
  );
};

export default BreadCrumbs;
