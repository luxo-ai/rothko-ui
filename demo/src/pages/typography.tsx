import { Grid, WidthGeqOnly } from '@rothko-ui/ui';
import React from 'react';
import TypographyCard from '../components/Cards/typography';
import NavigationList from '../components/NavigationList';

const Typography = () => {
  return (
    <Grid padding="2rem 0" gridTemplateColumns="minmax(100px, 250px) 1fr">
      <WidthGeqOnly threshold={750}>
        <NavigationList />
      </WidthGeqOnly>
      <TypographyCard />
    </Grid>
  );
};

export default Typography;
