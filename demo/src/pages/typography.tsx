import React from 'react';
import TypographyCard from '../components/Cards/typography';
import WithNavigation from '../components/WithNavigation';

const Typography = () => {
  return (
    <WithNavigation selected="/typography">
      <TypographyCard />
    </WithNavigation>
  );
};

export default Typography;
