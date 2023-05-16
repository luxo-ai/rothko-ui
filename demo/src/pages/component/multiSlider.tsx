import { Grid, WidthGeqOnly } from '@rothko-ui/ui';
import MultiSliderCard from '../../components/Cards/multiSlider';
import NavigationList from '../../components/Navigation/NavigationList';
import React from 'react';

const MultiSlider = () => {
  return (
    <Grid padding="2rem 0" gridTemplateColumns="minmax(100px, 250px) 1fr">
      <WidthGeqOnly threshold={750}>
        <NavigationList />
      </WidthGeqOnly>
      <MultiSliderCard />
    </Grid>
  );
};

export default MultiSlider;
