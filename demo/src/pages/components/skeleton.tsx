import React from 'react';
import SkeletonCard from '../../components/Cards/skeleton';
import WithNavigation from '../../components/WithNavigation';

const Skeleton = () => {
  return (
    <WithNavigation selected="components/skeleton">
      <SkeletonCard />
    </WithNavigation>
  );
};

export default Skeleton;