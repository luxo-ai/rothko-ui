import React from 'react';
import BreadCrumbsCard from '../../components/Cards/breadCrumbs';
import WithNavigation from '../../components/WithNavigation';

const BreadCrumbs = () => {
  return (
    <WithNavigation>
      <BreadCrumbsCard />
    </WithNavigation>
  );
};

export default BreadCrumbs;
