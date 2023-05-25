import React from 'react';
import SliderCard from '../../components/Cards/slider';
import WithNavigation from '../../components/WithNavigation';

const Slider = () => {
  return (
    <WithNavigation selected="components/slider">
      <SliderCard />
    </WithNavigation>
  );
};

export default Slider;
