import React from 'react';
import LabelCard from '../../components/Cards/label';
import WithNavigation from '../../components/WithNavigation';

const Label = () => {
  return (
    <WithNavigation selected="components/label">
      <LabelCard />
    </WithNavigation>
  );
};

export default Label;
