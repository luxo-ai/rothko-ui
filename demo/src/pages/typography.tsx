import React from 'react';
import TypographyCard from '../components/ccards/typography';
import WithNavigation from '../components/WithNavigation';

const Typography = () => {
  return (
    <WithNavigation selected="/typography">
      <TypographyCard />
    </WithNavigation>
  );
};

export default Typography;
