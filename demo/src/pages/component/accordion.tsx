import { Grid, WidthGeqOnly } from '@rothko-ui/ui';
import React from 'react';
import AccordionCard from '../../components/Cards/accordion';
import NavigationList from '../../components/Navigation/NavigationList';

const Main = () => {
  return (
    <Grid padding="2rem 0" gridTemplateColumns="minmax(100px, 250px) 1fr">
      <WidthGeqOnly threshold={750}>
        <NavigationList />
      </WidthGeqOnly>
      <AccordionCard />
    </Grid>
  );
};

export default Main;
