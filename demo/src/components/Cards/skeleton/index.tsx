import { Typography, SkeletonBox, SkeletonBoxWithLabel, SkeletonBuilder } from '@rothko-ui/ui';
import React from 'react';
import cardStyles from '../Cards.module.scss';

const SkeletonCard = () => {
  return (
    <div className={cardStyles.componentCard}>
      <Typography.h4 style={{ marginBottom: '1rem' }}>Skeleton</Typography.h4>
      <div className="Skeleton-container">
        <SkeletonBox width={200} />
        <SkeletonBoxWithLabel width={100} />
      </div>
    </div>
  );
};

export default SkeletonCard;
