import { Grid, WidthGeqOnly } from '@rothko-ui/ui';
import React from 'react';
import LabelCard from '../../components/Cards/label';
import NavigationList from '../../components/Navigation/NavigationList';

const Label = () => {
  return (
    <Grid padding="2rem 0" gridTemplateColumns="minmax(100px, 250px) 1fr">
      <WidthGeqOnly threshold={750}>
        <NavigationList />
      </WidthGeqOnly>
      <LabelCard />
    </Grid>
  );
};

export default Label;
