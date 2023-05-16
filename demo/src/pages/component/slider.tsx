import { Grid, WidthGeqOnly } from '@rothko-ui/ui';
import SliderCard from '../../components/Cards/slider';
import NavigationList from '../../components/Navigation/NavigationList';
import React from 'react';

const Slider = () => {
  return (
    <Grid padding="2rem 0" gridTemplateColumns="minmax(100px, 250px) 1fr">
      <WidthGeqOnly threshold={750}>
        <NavigationList />
      </WidthGeqOnly>
      <SliderCard />
    </Grid>
  );
};

export default Slider;
