import React from 'react';
import MultiSliderCard from '../../components/cards/multiSlider';
import WithNavigation from '../../components/WithNavigation';

const MultiSlider = () => {
  return (
    <WithNavigation selected="components/multiSlider">
      <MultiSliderCard />
    </WithNavigation>
  );
};

export default MultiSlider;
